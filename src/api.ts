const API_URL = 'http://localhost:3000';

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse extends User {
  id: number;
}

export interface Image {
  id: number;
  name: string;
  url: string;
}

export interface Annotation {
  id: number;
  author: string;
  comment: string;
  userId: number;
  imageId: number;
  pos: Pos;
}

export interface Pos {
  x: number;
  y: number;
}

export async function createUser({ name, email, password }: User): Promise<UserResponse> {
  const userByEmail = await getUserByEmail(email);

  if (userByEmail.length) {
    throw new Error('User already exists');
  }

  const userResponse = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!userResponse.ok) {
    throw new Error('Could not create user');
  }

  return await userResponse.json();
}

export async function getUserByEmail(email: string): Promise<UserResponse[]> {
  const userResponse = await fetch(`${API_URL}/users?email=${email}`);

  if (!userResponse.ok) {
    throw new Error('Could not get user');
  }

  return await userResponse.json();
}

export async function authWithUserId(userId: number): Promise<UserResponse | void> {
  try {
    const userResponse = await fetch(`${API_URL}/users/${userId}`);

    if (!userResponse.ok) {
      throw new Error('Could not get user');
    }

    return await userResponse.json();
  } catch (error) {
    alert('Please start the server \n json-server --watch db.json');
    throw new Error('Could not get user');
  }
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<UserResponse[] | void> {
  try {
    const userResponse = await fetch(`${API_URL}/users?email=${email}&password=${password}`);

    if (!userResponse.ok) {
      throw new Error('Could not login');
    }

    return await userResponse.json();
  } catch (error) {
    alert('Please start the server \n json-server --watch db.json');
    throw new Error('Could not login');
  }
}

export async function getImages(): Promise<Image[]> {
  const imagesResponse = await fetch(`${API_URL}/images`);

  if (!imagesResponse.ok) {
    throw new Error('Could not get images');
  }

  return await imagesResponse.json();
}

export async function getAnnotations(id: number): Promise<Annotation[]> {
  const annotationsResponse = await fetch(`${API_URL}/annotations?imageId=${id}`);

  if (!annotationsResponse.ok) {
    throw new Error('Could not get annotations');
  }

  return await annotationsResponse.json();
}

export async function creatAnnotation({
  authorId,
  comment,
  imageId,
  pos,
}: {
  authorId: number;
  comment: string;
  imageId: number;
  pos: Pos;
}): Promise<Annotation> {
  const authorData = await fetch(`${API_URL}/users/${authorId}`);

  if (!authorData.ok) {
    throw new Error('Could not get author');
  }

  const author = await authorData.json();

  const annotationsResponse = await fetch(`${API_URL}/annotations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      author: author.name,
      comment: comment.slice(0, 40),
      userId: author.id,
      imageId,
      pos,
    }),
  });

  if (!annotationsResponse.ok) {
    throw new Error('Could not create annotation');
  }

  return await annotationsResponse.json();
}

export async function deletAnnotation(id: number): Promise<boolean> {
  const annotationsResponse = await fetch(`${API_URL}/annotations/${id}`, {
    method: 'DELETE',
  });

  if (!annotationsResponse.ok) {
    throw new Error('Could not delete annotation');
  }

  return true;
}

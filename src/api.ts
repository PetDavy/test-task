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

export interface Anotation {
  id: string;
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

export async function authWithUserId(userId: number): Promise<UserResponse> {
  const userResponse = await fetch(`${API_URL}/users/${userId}`);

  if (!userResponse.ok) {
    throw new Error('Could not get user');
  }

  return await userResponse.json();
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<UserResponse[]> {
  const userResponse = await fetch(`${API_URL}/users?email=${email}&password=${password}`);

  if (!userResponse.ok) {
    throw new Error('Could not login');
  }

  return await userResponse.json();
}

export async function getImages(): Promise<Image[]> {
  const imagesResponse = await fetch(`${API_URL}/images`);

  if (!imagesResponse.ok) {
    throw new Error('Could not get images');
  }

  return await imagesResponse.json();
}

export async function getAnnotations(id: number): Promise<Anotation[]> {
  const anotationsResponse = await fetch(`${API_URL}/annotations?imageId=${id}`);

  if (!anotationsResponse.ok) {
    throw new Error('Could not get anotations');
  }

  return await anotationsResponse.json();
}

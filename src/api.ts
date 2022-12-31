const API_URL = 'http://localhost:3000';

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse extends User {
  id: number;
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

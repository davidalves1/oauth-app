import jwtDecode from 'jwt-decode';
import { cookies } from 'next/headers';

interface User {
    sub: string;
    name: string;
    avatarUrl: string;
}

const CLIENT_TOKEN_KEY = 'client.token';

export function getUser(): User | null {
  const token = cookies().get(CLIENT_TOKEN_KEY)?.value;

  if (!token) {
    return null;
  }

  const user: User = jwtDecode(token);

  return user;
}

export function logout() {
  cookies().set(CLIENT_TOKEN_KEY, '');
}

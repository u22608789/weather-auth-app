export interface User {
  username: string;
  password: string; // hashed
}

export const users: User[] = [];

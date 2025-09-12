export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
}

export interface Bookmark {
  id: number;
  userId: number;
  name: string;
  url: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Bookmark {
  id: number;
  userId: number;
  name: string;
  url: string;
}

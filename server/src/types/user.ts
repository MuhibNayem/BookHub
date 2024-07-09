export interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'author' | 'viewer';
  created_at: Date;
  updated_at: Date;
}

import { Author } from './author';
import { User } from './user';

export interface Params {
  user?: User;
  author?: Author;
  resourceId?: number;
}

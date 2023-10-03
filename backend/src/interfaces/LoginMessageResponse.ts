import {User} from './user';

export default interface LoginMessageResponse {
  token?: string;
  message: string;
  user: User;
}

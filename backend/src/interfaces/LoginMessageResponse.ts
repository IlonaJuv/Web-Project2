import {UserLogin} from './user';

export default interface LoginMessageResponse {
  token?: string;
  message: string;
  user: UserLogin;
}


interface User {
    username: string;
    password: string;
    email: string;
}
interface UserLogin {
    username: string;
    email: string;
    id: string;
  }
  
  interface TokenUser {
    id: string;
  }
  
  interface UserIdWithToken {
    id: string;
    token: string;
  } 

export {User, UserLogin, TokenUser, UserIdWithToken}
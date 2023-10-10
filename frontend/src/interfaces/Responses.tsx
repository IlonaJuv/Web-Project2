import User from "./User";
export interface RegisterResponse {
    register: {
        data: User
        token: string
    }
  }
  export interface LoginResponse {
    login: {
        token: string
        user: User
    }
  }
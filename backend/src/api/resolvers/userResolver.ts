import LoginMessageResponse from "../../interfaces/LoginMessageResponse";
import fetchData from "../../utils/fetchData";
import { User } from "../../interfaces/user";
import AuthMessageResponse from "../../interfaces/AuthMessageResponse";

export default {
    Query: {
        users: async () => {
              const users = await fetchData<AuthMessageResponse>(
                `${process.env.AUTH_URL}/users`
              );
              console.log("userResolver users: ", users)
              return users.data;
          },
        userById: async (_parent: undefined, args: {id: string}) => {
            console.log("userbyid")
            const user = await fetchData<AuthMessageResponse>(
              `${process.env.AUTH_URL}/users/${args.id}`
            );
            console.log("userByID, ", user)
            return user.data;
          },
      },
      Mutation: {
        login: async (
            _parent: undefined,
            args: {email: string; password: string}
          ) => {
            const options: RequestInit = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(args),
            };
            const user = await fetchData<LoginMessageResponse>(
              `${process.env.AUTH_URL}/auth/login`,
              options
            );
            return user;
          },
          register: async (_parent: undefined, args: {user: User}) => {
            console.log("register")
            const options: RequestInit = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(args.user),
            };
      
            const user = await fetchData<AuthMessageResponse>(
              `${process.env.AUTH_URL}/users`,
              options
            );
            console.log('Register user', user);
      
            return user;
          },
      }
};
import LoginMessageResponse from "../../interfaces/LoginMessageResponse";
import fetchData from "../../utils/fetchData";
import { User, UserIdWithToken } from "../../interfaces/user";
import AuthMessageResponse from "../../interfaces/AuthMessageResponse";
import { GraphQLError } from "graphql";

export default {
    Query: {
        users: async () => {
              const users = await fetchData<AuthMessageResponse>(
                `${process.env.AUTH_URL}/users`
              );
              return users.data;
          },
        userById: async (_parent: undefined, args: {id: string}) => {
            console.log("userbyid")
            const user = await fetchData<AuthMessageResponse>(
              `${process.env.AUTH_URL}/users/${args.id}`
            );
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
      
            return user;
        },
        updateUser: async (
          _parent: undefined,
          args: {user: User},
          user: UserIdWithToken
         ) => {
             if (!user.token) {
              throw new GraphQLError('You are not authorized to perform this action');
            }
            const options: RequestInit = {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify(args.user),
            };
      
            const response = await fetchData<LoginMessageResponse>(
              `${process.env.AUTH_URL}/users`,
              options
            );
            return response;
          },
        deleteUser: async (
            _parent: undefined,
            args: undefined,
            user: UserIdWithToken
          ) => {
            if (!user.token) {
              throw new GraphQLError('You are not authorized to perform this action');
            }
            const options: RequestInit = {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
              },
            };
      
            const response = await fetchData<LoginMessageResponse>(
              `${process.env.AUTH_URL}/users`,
              options
            );
            return response;
          },
      }
};
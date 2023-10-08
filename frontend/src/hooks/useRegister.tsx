import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { GraphQLClient, gql } from "graphql-request";
import User from "../interfaces/User";

export interface LoginResponse {
    register: {
        data: User
    }
}

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAuthContext();

    const register = async (user: User) => {
        setIsLoading(true);
        setError(null);
        try {
            const API_URL = process.env.REACT_APP_API_URL;
            const registerUserMutation = gql`
            mutation Register($user: UserInput!) {
              register(user: $user) {
                message
                data {
                  id
                  username
                  email
                }
              }
            }  `;
            const graphQLClient = new GraphQLClient(API_URL || "", {});
          
            const data: LoginResponse = await graphQLClient.request(registerUserMutation, {user});
            const response: User = data.register.data;
            console.log("response useReg: ", data)
            localStorage.setItem('user', JSON.stringify(response));
            dispatch({ type: 'LOGIN', payload: response });
            setIsLoading(false);
        } catch (error: any) {
            setError(error);
            setIsLoading(false);
        }
    }

    return { register, error, isLoading };
}

/*import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { GraphQLClient, gql } from "graphql-request";
import User from "../interfaces/User";

export interface LoginResponse {
    login: {
        token: string
        user: User
    }
}

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAuthContext();

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const API_URL = process.env.REACT_APP_API_URL
            const loginUserMutation = gql`
            mutation Login($email: String!, $password: String!) {
                login(email: $email, password: $password) {
                  token
                  message
                  user {
                    id
                    username
                    email
                  }
                }
              }
            `;
            const graphQLClient = new GraphQLClient(API_URL || "", {});
            const variables = {
                email: email,
                password: password
            };
            console.log(loginUserMutation);
            const data: LoginResponse = await graphQLClient.request(loginUserMutation, variables);
            const json = JSON.stringify(data);
            const response: User = data.login.user;
            const token: string = data.login.token;
            localStorage.setItem('user', JSON.stringify(response));
            localStorage.setItem('token', token);
            console.log(localStorage.getItem('user'));
            console.log(localStorage.getItem('token'));
            
            if(response != null) {
                dispatch({type: 'LOGIN', payload: json});
                setIsLoading(false);
            }
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    return {login, error, isLoading};
}
*/export {}
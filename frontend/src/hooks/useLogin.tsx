import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { GraphQLClient, gql } from "graphql-request";

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
                mutation login($email: String!, $password: String!) {
                    login(email: $email, password: $password) {
                        user {
                            id
                            username
                            email
                        }
                    }
                }
                `;
            const graphQLClient = new GraphQLClient(API_URL || "", {
            });
            const variables = {
                email: email,
                password: password
            };
            console.log(loginUserMutation);
            const data = await graphQLClient.request(loginUserMutation, variables);
            const response: any = data;
            console.log(response.login.user);
            localStorage.setItem('user', JSON.stringify(response.login.user));
            console.log(localStorage.getItem('user'));
            dispatch({type: 'LOGIN', payload: response.login.user});
            setIsLoading(false);
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    return {login, error, isLoading};
}
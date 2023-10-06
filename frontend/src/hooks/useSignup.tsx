import { useState } from "react";
import { useAuthContext } from './useAuthContext';

const API_URL = process.env.REACT_APP_API_URL;

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const signupUserMutation = `
                mutation {
                    register(user: { username: "Test User", email: "testUser@gmail.com", password: "test123"}) {
                    message
                    }
                }`
        } catch (error: any) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    return { signup, error, isLoading };

}
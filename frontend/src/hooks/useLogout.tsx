/*import { useAuthContext } from './useAuthContext';

export const useLogout = () => {

}
*/
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAuthContext();

    const logout = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            // Optionally, you can perform any cleanup or additional actions here,
            // such as sending a request to a server to invalidate the session.
            
            // Clear the user from local storage
            console.log("localstorage user: ", localStorage.getItem('user'));
            localStorage.removeItem('user');
            
            // Dispatch the 'LOGOUT' action to update the user state to null
            dispatch({ type: 'LOGOUT' });
            
            setIsLoading(false);
        } catch (error: any) {
            setError(error);
            setIsLoading(false);
        }
    }

    return { logout, error, isLoading };
}

import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    console.log()
    if(context === undefined) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    return context;
}
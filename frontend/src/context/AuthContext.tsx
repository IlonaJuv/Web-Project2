import { createContext, useReducer, useEffect } from "react";
import User from "../interfaces/User";

export const AuthContext = createContext<any>(null)

export const authReducer = (state: any, action: any) => {
    switch(action.type) {
        case 'LOGIN':
            return {user: action.payload};
        case 'LOGOUT':
            return {user: null};
        default:
            return state;
    }
}

export const AuthContextProvider = ({ children } : {children:any}) => {
    const [state, dispatch] = useReducer(authReducer, {user: null});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if(user !== null) {
            dispatch({type: 'LOGIN', payload: user});
        }
    }, []);
    console.log('AuthContext state: ', state);
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
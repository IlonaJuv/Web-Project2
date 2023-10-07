import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext<any>(null);
console.log("AuthContext: ", AuthContext);


export const authReducer = (state: any, action: any) => {
    console.log("authreducer state: ", state, action.type)
    switch(action.type) {
        case 'LOGIN':
            console.log("authreducer login")
            return {user: action.payload};
        case 'LOGOUT':
            console.log("authreducer logout")
            return { user: null};
        default:
            console.log("authreducer default")
            return state;
    }
}

export const AuthContextProvider = ({children}: any) => {
    const [state, dispatch] = useReducer(authReducer, {user: null});
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if(user) {
            console.log("AuthContextProvider user.user: ", user.user);
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
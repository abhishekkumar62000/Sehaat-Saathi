/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";

const getInitialState = () => {
    try {
        const user = localStorage.getItem("user");
        return {
            user: user ? JSON.parse(user) : null,
            role: localStorage.getItem("role") || null,
            token: localStorage.getItem("token") || null,
        };
    } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        // Clear corrupted data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        return {
            user: null,
            role: null,
            token: null,
        };
    }
};

const initialState = getInitialState();

export const authContext = createContext(initialState);

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                role: null,
                token: null,
            };

        case "LOGIN_SUCCESS":
            return {
                user: action.payload.user,
                role: action.payload.role,
                token: action.payload.token,
            };

        case "LOGOUT":
            return {
                user: null,
                role: null,
                token: null,
            };

        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("token", state.token);
        localStorage.setItem("role", state.role);
    }, [state]);

    return (
        <authContext.Provider
            value={{
                user: state.user,
                role: state.role,
                token: state.token,
                dispatch,
            }}
        >
            {children}
        </authContext.Provider>
    );
};

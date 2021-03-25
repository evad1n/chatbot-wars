import React, { createContext, useContext, useState } from "react";
import API from 'scripts/api';

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(false);

    const register = async (loginData) => {
        console.log(loginData);
        return;
        try {
            let response = await API.post('/users', loginData);
            return response;
        } catch (error) {
            console.error(error);
        }
    };

    const login = async (username, password) => {
        console.log(username, password);
        return;
        try {
            let response = await API.post('/sessions', {
                username,
                password
            });
            // Save token in localstorage
            localStorage.setItem("jwt_token", response.data.token);
            setUser({
                uid: response.data.uid,
                username: response.data.username
            });
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        // Delete token from local storage
        localStorage.removeItem("jwt_token");
        setUser(false);
    };

    // Return the user object and auth methods
    return {
        user,
        register,
        login,
        logout,
    };
}
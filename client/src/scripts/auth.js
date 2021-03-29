import React, { createContext, useContext, useState, useEffect } from "react";
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
    // Start as true, and once no user is discovered, routes will be rerendered
    const [user, setUser] = useState(true);

    // Initial attempt to fetch jwt
    useEffect(() => {

        async function fetchData() {
            let token = localStorage.getItem("jwt_token");
            if (token != null) {
                try {
                    let response = await API.get('/me');
                    setUser({
                        uid: response.data.uid,
                        username: response.data.username
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        }

        fetchData();
    }, []);

    const register = async (loginData) => {
        try {
            let response = await API.post('/users', loginData);
            return response;
        } catch (error) {
            throw Error(error);
        }
    };

    const login = async (username, password) => {
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
            return true;
        } catch (error) {
            throw Error(error);
        }
    };

    const logout = () => {
        // Delete token from local storage
        localStorage.removeItem("jwt_token");
        setUser(() => false);
    };

    // Return the user object and auth methods
    return {
        user,
        register,
        login,
        logout,
    };
}
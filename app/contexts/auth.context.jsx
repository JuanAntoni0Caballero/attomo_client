import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('authoToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = (authoToken) => {
        localStorage.setItem('authoToken', authoToken);
        setToken(authoToken);
        console.log('EL TOKEN EN AUTHCONTEXT==>', authoToken);
    };

    const logout = () => {
        localStorage.removeItem('authoToken');
        setToken('');
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

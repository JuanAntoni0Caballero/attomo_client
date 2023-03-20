import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState('')
    const [userData, setUserData] = useState('')

    useEffect(() => {
        const storedToken = localStorage.getItem('authoToken');
        if (storedToken) {
            setToken(storedToken);
            getUserData(storedToken);
        }
    }, []);

    const getUserData = async (authoToken) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
                headers: {
                    Authorization: `Bearer ${authoToken}`
                },
            });

            if (response.ok) {
                const userData = await response.json();
                setUserData(userData)
            } else {
                console.error('Error al obtener los datos del usuario');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const login = (authoToken) => {
        localStorage.setItem('authoToken', authoToken);
        setToken(authoToken);
    };

    const logout = () => {
        localStorage.removeItem('authoToken');
        setToken('');
        setUserData('');
    };

    return (
        <AuthContext.Provider value={{ token, userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

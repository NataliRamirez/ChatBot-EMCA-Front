// AuthContext.jsx (Versión más limpia y semántica)
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token_emca');
        if (token) {
            // 🌟 Cambiado a 'user_name' para ser claros
            setUser({ nombre: localStorage.getItem('user_name') }); 
        }
        setLoading(false);
    }, []);

    // 🌟 Ahora recibe explícitamente el 'nombre'
    const login = (nombre, token) => {
        localStorage.setItem('token_emca', token);
        localStorage.setItem('user_name', nombre); // 🌟 Clave más descriptiva
        setUser({ nombre }); 
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
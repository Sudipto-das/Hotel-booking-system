import { useState, createContext, Children, useEffect } from "react";
import { login, register, profile } from "./services/auth.services";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    

    const handleLogin = async (email, password) => {
        setLoading(true);
        try {
            const userData = await login(email, password);
            setUser(userData);
            setError(null);
        } catch (err) {
            setError("Login failed. Please check your credentials.");

        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async (username, email, password) => {
        setLoading(true);
        try {
            const userData = await register(username, email, password);
            setUser(userData);
            setError(null);
        } catch (err) {
            setError("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }


    const checkAuth = async() =>{
        setLoading(true);
        try{
            const userData = await profile();
            setUser(userData);
        } catch(err){
            setUser(null);
        } finally{
            setLoading(false);
        }
        
    }

    useEffect(() =>{
        checkAuth()
    },[]);

    return (
        <AuthContext.Provider value={{ user, loading, error, handleLogin, handleRegister, }}>
            {children}
        </AuthContext.Provider>
    );
}

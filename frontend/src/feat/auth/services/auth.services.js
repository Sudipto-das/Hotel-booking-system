

import axios from "axios";

// Use environment variable for backend URL, fallback to localhost for development
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const API_URL = `${backendUrl}/api/auth/`;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

export const register = async(username, email, password) => {
    try{
        const response = await api.post('/register',{username,email,password});
        return response.data;
    }
    catch(error){
        console.error("Registration failed:", error);
        throw error;
    }

}

export const login = async (email,password)=>{
    try{
        const response = await api.post('/login',{email,password});
        return response.data;
    } catch(error){
        console.error("Login failed:",error)
        throw error;
    }
}


export const profile = async()=>{
    try{
        const response = await api.get('/profile');
        return response.data;
    } catch(error){
        console.error("Fetch profile failed:",error)
        throw error;
    }
}

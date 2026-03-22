

import axios from "axios";

const API_URL = "https://hotel-booking-system-kfs9.onrender.com/api/auth/";

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

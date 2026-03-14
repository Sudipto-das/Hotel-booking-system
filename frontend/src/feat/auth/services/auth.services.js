

import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
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
    }
}


import axios from "axios";

const api = axios.create({
    baseURL: "https://hotel-booking-system-kfs9.onrender.com/api/guests",
    withCredentials: true
})


export const getAllGuests = async () => {
    try {
        const response = await api.get('/all');
        return response.data;
    } catch (error) {
        console.error("Error fetching guests:", error);
        throw error;
    };
}

export const addGuest = async(guestData)=>{
    try{
        const response = await api.post('/create', guestData);
        return response.data;
    } catch(error){
        console.error("Error adding guest:", error);
        throw error;
    }
}

export const updateGuest = async( guestId, guestData) =>{
    try{
        const response = await api.put(`/update/${guestId}`, guestData);
        return response.data;
    } catch(error){
        throw error;
    }
}

export const deleteGuest = async(guestId) =>{
    try{
        const response = await api.delete(`/delete/${guestId}`);
        return response.data;
    } catch(error){
        throw error;
    }
}
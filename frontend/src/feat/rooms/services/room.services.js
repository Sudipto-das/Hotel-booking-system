import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:3000/api/rooms",
    withCredentials: true
})


const getAllRooms = async() =>{
    try{
        const response = await api.get('/all');
        return response.data;
    } catch (error) {
        console.error("Error fetching rooms:", error);
        throw error;
    }
}


const addRoom = async(roomData) =>{
    try{
        const response = await api.post('/create',roomData);
        return response.data;
    } catch(error){
        console.error("Error adding room:", error);
        throw error;
    }
}

const updateRoom = async(roomId,roomData) =>{
    try{
        const response = await api.put(`/update/${roomId}`,roomData);
        return response.data;
    } catch(error){
        console.error("Error updating room:", error);
        throw error;
    }
}

const deleteRoom = async(roomId)=>{
    try{
        const response = await api.delete(`/delete/${roomId}`);
        return response.data;
    } catch(error){
        console.error("Error deleting room:", error);
        throw error;
    }
}

export {getAllRooms,addRoom,updateRoom,deleteRoom};
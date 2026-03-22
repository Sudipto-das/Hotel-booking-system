import axios from "axios";


const api = axios.create({
    baseURL: "https://hotel-booking-system-kfs9.onrender.com/api/rooms",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
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


const addRoom = async(roomData, imageFile) =>{
    try{
        // Create FormData for file upload
        const formData = new FormData();
        
        // Append all room fields
        formData.append("roomNumber", roomData.roomNumber);
        formData.append("type", roomData.type);
        formData.append("pricePerNight", roomData.pricePerNight);
        formData.append("capacity", roomData.capacity);
        formData.append("status", roomData.status);
        formData.append("amenities", JSON.stringify(roomData.amenities));
        
        // Append image file if exists
        if (imageFile) {
            formData.append("image", imageFile);
        }

        const response = await api.post('/create', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    } catch(error){
        console.error("Error adding room:", error);
        throw error;
    }
}

const updateRoom = async(roomId, roomData, imageFile) =>{
    try{
        // Create FormData for file upload
        const formData = new FormData();
        
        // Append all room fields
        formData.append("roomNumber", roomData.roomNumber);
        formData.append("type", roomData.type);
        formData.append("pricePerNight", roomData.pricePerNight);
        formData.append("capacity", roomData.capacity);
        formData.append("status", roomData.status);
        formData.append("amenities", JSON.stringify(roomData.amenities));
        
        // Append image file if exists
        if (imageFile) {
            formData.append("image", imageFile);
        }

        const response = await api.put(`/update/${roomId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
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
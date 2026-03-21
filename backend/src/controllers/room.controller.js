const Room = require("../models/room.model.js")


const createRoomController = async (req,res)=>{
    try{
        const {roomNumber,pricePerNight,type,capacity} = req.body;
        let {amenities} = req.body;
        
        // Parse amenities if it's a stringified JSON array
        if (typeof amenities === 'string') {
            try {
                amenities = JSON.parse(amenities);
            } catch (e) {
                amenities = [];
            }
        }
        
        // Handle image upload
        let imageUrl = "";
        if (req.file) {
            // Store the relative URL path to the image
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const room = await Room.create({
            roomNumber,
            pricePerNight,
            amenities,
            type,
            capacity,
            imageUrl,
            status:"Available",
            createdBy:"Admin"
        })
        res.status(201).json({message:"Room created successfully",room})

    } catch(err){
        res.status(500).json({message:"Error creating room",error:err.message})
    }
}
const getAllRoomsController =async(req,res)=>{
    try{
        const rooms =await Room.find();
        res.status(200).json({message:"Rooms fetched successfully",rooms});

    } catch(err){
        res.status(500).json({message:"Error fetching rooms",error:err.message})
    }
}

const updateRoomController = async(req,res)=>{
    try{
        const {id} = req.params;
        const {roomNumber,pricePerNight,status,capacity,type} =req.body;
        let {amenities} = req.body;
        
        // Parse amenities if it's a stringified JSON array
        if (typeof amenities === 'string') {
            try {
                amenities = JSON.parse(amenities);
            } catch (e) {
                amenities = [];
            }
        }
        
        // Handle image upload
        let imageUrl;
        if (req.file) {
            // If a new image is uploaded, use the new filename
            imageUrl = `/uploads/${req.file.filename}`;
        }

        const updateData = {
            roomNumber,
            pricePerNight,
            amenities,
            status,
            capacity,
            type,
            updatedAt:Date.now()
        };

        // Only update imageUrl if a new file was uploaded
        if (imageUrl) {
            updateData.imageUrl = imageUrl;
        }

        const room = await Room.findByIdAndUpdate(id, updateData, {returnDocument:"after"});
        if(!room){
            return res.status(404).json({message:"Room not found"})
        }
        res.status(200).json({message:"Room updated successfully",room})
    } catch(err){
        res.status(500).json({message:"Error updating room",error:err.message})
    }
}

const deleteRoomController = async(req,res)=>{
    try{
        const {id} = req.params;
        const room = await Room.findByIdAndDelete(id);
        if(!room){
            return res.status(404).json({message:"Room not found"})
        }
        res.status(200).json({message:"Room deleted successfully"})
    } catch(err){
        res.status(500).json({message:"Error deleting room",error:err.message})
    }
}

module.exports = {createRoomController,getAllRoomsController,updateRoomController,deleteRoomController}
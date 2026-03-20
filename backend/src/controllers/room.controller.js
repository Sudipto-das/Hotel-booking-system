const Room = require("../models/room.model.js")


const createRoomController = async (req,res)=>{
    try{
        const {roomNumber,pricePerNight,amenities,type,capacity,imageUrl} = req.body;
        const room = await Room.create({
            roomNumber,pricePerNight,amenities,type,capacity,imageUrl,status:"Available",createdBy:"Admin"
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
        const {roomNumber,pricePerNight,amenities,status,capacity,type} =req.body;
        const room = await Room.findByIdAndUpdate(id,{roomNumber,pricePerNight,amenities,status,capacity,type,updatedAt:Date.now()},{returnDocument:"after"});
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
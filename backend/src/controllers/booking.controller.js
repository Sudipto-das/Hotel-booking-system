const { model } = require('mongoose');
const Booking = require('../models/booking.model.js');



// Create and Save a new Booking

const createBookingController = async(req,res)=>{
    try{
        const {checkOutDate,totalPrice,roomId,userId,clientId} = req.body;
        const booking = new Booking({
            checkInDate:Date.now(),checkOutDate,totalPrice,roomId,userId,clientId
        });
        const data = await booking.save();
        res.status(201).json({message:"Booking created successfully",data});
    } catch(err){
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Booking."
        });
    }
}

// Retrieve all Bookings from the database.

const getAllBookingsController = async(req,res)=>{
    try{
        const data = await Booking.find().populate('roomId').populate('userId').populate('clientId');
        res.status(200).json({message:"Bookings retrieved successfully",data});
    } catch(err){
        res.status(500).send({message:err.message||"Some error occurred while retrieving Bookings."});
    }
}


module.exports = {createBookingController, getAllBookingsController}
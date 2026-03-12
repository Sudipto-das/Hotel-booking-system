const mongoose = require("mongoose")


const roomSchema = new mongoose.Schema({
    roomNumber:String,
    pricePerNight:Number,
    amenities:[String], //Ac,TV,Wifi,Fridge
    status:String,    //Available,Booked,Maintenance
    createdBy:String,
    createdAt:{ type: Date, default: Date.now },
    updatedAt:{ type: Date, default: Date.now }

})

const Room = mongoose.model("Room",roomSchema);

module.exports = Room;
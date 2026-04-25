const mongoose = require("mongoose")


const roomSchema = new mongoose.Schema({
    roomNumber: String,
    pricePerNight: Number,
    type: String,  //Single,Double,Suite
    capacity: Number,
    amenities: [String], //Ac,TV,Wifi,Fridge
    roomBookedUpto: { type: Date, default: null },
    imageUrl: String,
    createdBy: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }

})

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
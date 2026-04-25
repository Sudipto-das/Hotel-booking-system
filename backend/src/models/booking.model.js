const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    checkInDate: Date,
    checkOutDate: Date,
    totalPrice: Number,
    paymentMethod: {
        type: String,
        default: 'Pay at Hotel'
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
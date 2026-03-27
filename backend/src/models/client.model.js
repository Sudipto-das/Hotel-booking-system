const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    name:String,
    phoneNumber:String,
    checkIn:{type: Date, default:Date.now},
    checkOut:{type:Date, default:Date.now},
    status:String,
    roomId:{type:mongoose.Schema.Types.ObjectId,ref:"Room"},
    createdAt:{ type: Date, default: Date.now },
    updatedAt:{ type: Date, default: Date.now }
})

const Client = mongoose.model("Client",clientSchema)
module.exports = Client
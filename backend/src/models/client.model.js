const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
    name:String,
    adharNumber:String,
    phoneNumber:String,
    createdAt:{ type: Date, default: Date.now },
    updatedAt:{ type: Date, default: Date.now }
})

const Client = mongoose.model("Client",clientSchema)
module.exports = Client
const Client = require("../models/client.model.js");

const createClientController = async(req,res)=>{
    try{
        const {name,phone,adharNumber} = req.body;
        const existingCilent = await Client.findOne({adharNumber});
        if(existingCilent){
            return res.status(400).json({message:"Client with this adhar number already exists"})
        }
        const newClient =await Client.create({name,phone,adharNumber});
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({message:"Error creating client", error});
    }
}

const getAllClientsController = async(req,res)=>{
    try{
        const clients = await Client.find();
        res.status(200).json(clients)
    } catch(err){
        res.status(500).json({message:"Error fetching clients",error:err.message})
    }
}
const updateClientController = async(req,res)=>{
    try{
        const {id} = req.params;
        const {name,phone,adharNumber} = req.body;
        const client = await Client.findByIdAndUpdate(id,{name,phone,adharNumber,updatedAt:Date.now()},{returnDocument:"after"});
        if(!client){
            return res.status(404).json({message:"Client not found"})
        }
        res.status(200).json({message:"Client updated successfully",client})
    } catch(err){
        res.status(500).json({message:"Error updating client",error:err.message})
    }
}

const deleteClientController = async(req,res)=>{
    try{
        const {id} = req.params;
        const client = await Client.findByIdAndDelete(id);
        if(!client){
            return res.status(404).json({message:"Client not found"})
        }
        res.status(200).json({message:"Client deleted successfully",client})
    } catch(err){
        res.status(500).json({message:"Error deleting client",error:err.message})
    }
}

module.exports = {createClientController,getAllClientsController,updateClientController,deleteClientController}
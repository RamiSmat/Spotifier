import mongoose from "mongoose"

const songSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }
})
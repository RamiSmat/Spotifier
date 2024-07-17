import mongoose from "mongoose"
import Song from "./songModel.js"
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required: function() {
            return !this.googleId;
        },
    },
    googleId:{
        type:String,
    },
    playlists: [{
        name: {
            type: String,
            required: true
        },
        songs: [{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Song',
        }]
    }],
    favorites: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Song',
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    date:{
        type:Date,
        default:Date.new,
    }
});


const User = mongoose.model("User",userSchema);

export default User;
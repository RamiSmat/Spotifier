import mongoose from "mongoose"

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
            title: {
                type: String,
                required: true
            },
            artist: String,
            youtubeId: {
                type: String,
                required: true
            }
        }]
    }],
    favorites: [{
        title: {
            type: String,
            required: true
        },
        artist: String,
        youtubeId: {
            type: String,
            required: true
        }
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
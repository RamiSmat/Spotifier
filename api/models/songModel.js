import mongoose from "mongoose"

const songSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    spotifyLink:{
        type:String,
    },
    youtubeLink:{
        type:String,
    },
    CoverPicture:{
        data:Buffer,
        contentType:String,
    }

})


const Song = mongoose.model("Song",songSchema);
export default Song;
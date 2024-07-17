import Song from "../models/songModel.js"
import {
    addSong,
    getSong,
    updateSong,
    deleteSong,

} from "../services/songService.js"

const getSongController = async(req,res,next) => {
    try{
        const {songId} = req.params;
        const Song = await getSong(songId);
        return res.status(200).json(Song);
    }catch(error){
        next(error);
    }
};
const addSongController = async(req,res,next) => {
    try{
        const Song = await addSong(req.body);
        return res.status(200).json({ "added" : Song });
    }catch(error){
        next(error);
    }
};
const deleteSongController = async(req,res,next) => {
    try{
        const {songId} = req.params;
        console.log(songId);
        const Song = await deleteSong(songId);
        return res.status(200).json({ "deleted" : Song });
    }catch(error){
        next(error);
    }
};
const updateSongController = async(req,res,next) => {
    try{
        const {songId,updatedSongData} = req.body;
        console.log(songId);
        console.log(updatedSongData);
        const Song = await updateSong(songId,updatedSongData);
        return res.status(200).json({"Updated to " : Song})
    }catch(error){
        next(error);
    }
};



export {
    addSongController,
    getSongController,
    updateSongController,
    deleteSongController,

}
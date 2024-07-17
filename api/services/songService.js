import Song from '../models/songModel.js'

const getSong = async (songId) => {
    try{
        return await Song.findById(songId);
    }catch(error){
        return error;
    }
};

const addSong = async(songData) => {
    try{
        console.log(songData);
        const newSong = new Song(songData);
        await newSong.save();
        return newSong;
    }catch(error){
        return error;
    }
};

const updateSong = async(songId,UpdatedSongData) => {
    try{
        console.log(songId);
        console.log(UpdatedSongData);
        const song= await Song.findByIdAndUpdate(songId,UpdatedSongData);
        return song;
    }catch(error){
        return error;
    }
}

const deleteSong = async(songId) => {
    try{
        return await Song.findByIdAndDelete(songId);
    }catch(error){
        return error;
    }
}


export {
    addSong,
    getSong,
    updateSong,
    deleteSong,

}
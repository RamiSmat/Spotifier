import {downloadSpotifyTrack} from "../services/downloadService.js"

const downloadSpotifyTrackController = async (req,res,next) => {
    try{
        const {link} = req.params;
        return await downloadSpotifyTrack(link);
    }catch(error){
        next(error);
    }
}

export { downloadSpotifyTrackController }
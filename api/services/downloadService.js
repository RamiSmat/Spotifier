import youtubesearchapi from "youtube-search-api";
import axios from "axios";
import ytDlp from 'youtube-dl-exec';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
dotenv.config();

const getSpotifyAccessToken = async()=>{
    const SPOTIFY_SECRET = process.env.SPOTIFY_SECRET; 
    const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
    const url = 'https://accounts.spotify.com/api/token';
    const data = {
      "grant_type": 'client_credentials',
      "client_id": SPOTIFY_CLIENT_ID,
      "client_secret": SPOTIFY_SECRET
    };
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      return response.data.access_token;
    } catch (error) {
      console.error('Error fetching the access token:', error);
      throw error;
    }
}

const generateSearchQuery = (data)=>{
    const artistNames = data.artists.map(artist => artist.name).join(", ");
    const concatenatedString = `${data.name} - ${artistNames}`;
    return concatenatedString;

};

const searchYoutubeForSpotifySong = async (spotifyLink) => {
    try{
        const base_url = 'https://api.spotify.com/v1/tracks/';
        const token = await getSpotifyAccessToken();
        const link = spotifyLink.split("/");
        if (link[3] ==="playlist"){
            return "Link is a playlist"
        };
        const spotifyId = link[link.length-1];
        const newUrl = base_url+spotifyId;
        const response = await axios.get(newUrl, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
        const query = generateSearchQuery(response.data);
        const YoutubeSearchResult = await youtubesearchapi.GetListByKeyword(query);
        YoutubeSearchResult.items[0].link = `youtube.com/watch?v=${YoutubeSearchResult.items[0].id}`
        return YoutubeSearchResult.items[0];
    }catch(error){
        return error;
    }
 
};

const downloadSpotifyTrack = async (link) => {
    const youtubeSong = await searchYoutubeForSpotifySong(link);
    const videoUrl = youtubeSong.link;
    if (videoUrl.startsWith('Link is a playlist')) {
      return youtubeSong;
    }
    try{
      const outputPath = path.join("./", 'downloads', '%(title)s.%(ext)s');
      ensureDirectoryExistence(outputPath);
      await ytDlp(videoUrl, {
        output: outputPath,
        format: 'bestaudio/best',
        postprocessorArgs: ['-x', '--audio-format', 'mp3', '--audio-quality', '192K'],
      });

      return path.join("./", 'downloads', `${path.basename(outputPath, '.%(ext)s')}.mp3`);
  } catch (error) {
    console.error('Error in downloadSpotifyTrack:', error);
    throw error;
  }

};

const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

const res = await downloadSpotifyTrack("https://open.spotify.com/track/2ezMwQqlQ7tF93Q29fZVJu");
console.log(res);
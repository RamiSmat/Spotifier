
# Spotifier

I'm currently building the backend of this app.

It's a web app that allows users to register, search spotify songs and playlists in youtube , download them or listen to them in the browser, users can follow other users , add favorite songs and organize playlists.

## Installation
Create a .env file containing the secrets
```bash
  nano ./spotifier/api/.env
```
.env file structure
```bash
 JWT_SECRET=""
 GOOGLE_CLIENT_SECRET=""
 GOOGLE_CLIENT_ID=""
 MONGO_URI="mongodb://localhost:27017/spotifier"
 PORT=8080
 SESSION_SECRET=""
```

Run the backend api
```bash
  cd spotifier/api
  npm i 
  npm run dev
```
    

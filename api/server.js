import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dbConnect from './config/db.mjs';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js';
import songRoutes from './routes/songRoutes.js'
import passport from './config/passport.js';
import session from 'express-session';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
}));
app.use(passport.initialize());
app.use(passport.session());


dbConnect();

app.use('/api/auth', userRoutes);
app.use('/api/song',songRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

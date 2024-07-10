import User from '../models/userModel.js';
import { register, login } from '../services/userService.js';
import { googleAuth , followUser , getFollowers, getFollowing , unfollowUser} from '../services/userService.js';

const registerUser = async (req, res) => {
    try {
        const token = await register(req.body);
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const token = await login(req.body.email, req.body.password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const googleCallback = async (req, res) => {
    try {
        const token = await googleAuth(req.user.googleId, req.user.name, req.user.email);
        res.redirect(`/api/auth/google/success?token=${token}`);
        console.log(token);
    } catch (error) {
        res.redirect('/api/auth/google/failure');
    }
};


const followUserController = async (req,res,next) =>{
    const userId = req.params.userId;
    const followUserId = req.params.followuserId;
    try{
        const result = await followUser(userId,followUserId);
        return res.status(200).json(result);
    }catch(error){
        next(error);
    }
}

const getFollowingController = async(req,res,next) => {
    const {userId} = req.params;
    try{
        const following = await getFollowing(userId);
        return res.status(200).json(following);
        
    }catch(error){
        next(error);
    }
}


const getFollowersController = async(req,res,next) => {
    const {userId} = req.params;
    try{
        const followers = await getFollowers(userId);
        console.log(followers);
        return res.status(200).json(followers);
        
    }catch(error){
        next(error);
    }
};

const unfollowUserController = async  (req,res,next) => {
    const {userId,unfollowUserId} = await req.params;
    try{
        const result=await unfollowUser(userId,unfollowUserId);
        return res.status(200).json(result);
    }catch(error){
        next(error);
    }
};

export {
    getFollowersController,
    followUserController,
    googleCallback, 
    registerUser,
    loginUser,
    getFollowingController,
    unfollowUserController,
};

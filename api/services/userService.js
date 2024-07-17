import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Song from '../models/songModel.js';
const register = async (userData) => {
    const { name, email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        name,
        email,
        password: hashedPassword,
    });

    await user.save();

    return generateToken(user);
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    return generateToken(user);
};

const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};
const googleAuth = async (googleId, name, email) => {
    let user = await User.findOne({ googleId });
    if (!user) {
        user = new User({ googleId, name, email });
        await user.save();
    }
    return generateToken(user);
};
const getUserById = async(id) => {
    try{
        const user = await User.findById(id);
        return user;
    }catch(error){
        console.log("get User By Id error");
        return(error)
    }
};
const followUser = async (userId,followUserId) => {
    try{
        const user = await getUserById(userId);
        const followUser = await getUserById(followUserId);

        if(!user||!followUser){
            throw new Error('User or follow user does not exist');
        }
        if(followUser.followers.includes(user)){
            throw new Error('User is already following this user');
        }
        user.following.push(followUser);
        followUser.followers.push(user);
        await user.save();
        await followUser.save();
        return {user,followUser};
    }catch(error){
        throw error;
    }
    
};

const getFollowing = async (userId) => {
    try{
        const user = await User.findById(userId).populate('following','name email');
        if (!user){
            throw new Error("user not found");
        }
        if (!user.following) {
            return [];
        }
        return user.following.map(following => ({
            name: following.name,
            email: following.email,
        }));
    }catch(error){
        console.log("getFollowers error");
        throw error;
    }
};

const getFollowers = async (userId) => {
    try {
        const user = await User.findById(userId).populate('followers', 'name email');
        if (!user) {
            throw new Error('User not found');
        }
        if (!user.followers) {
            return [];
        }
        return user.followers.map(follower => ({
            name: follower.name,
            email: follower.email,
        }));
    } catch (error) {
        console.error("getFollowers error:", error);
        throw error;
    }
};

const unfollowUser = async (userId,unfollowUserId) => {
    try{
        const user = await getUserById(userId);
        const unfollowUser = await getUserById(unfollowUserId);
        console.log(unfollowUser.followers);
        console.log(user.following);
        if (!user || !unfollowUser){
            throw new Error('user or unfollow user not found');
        }
        if(!user.following.includes(unfollowUserId)){
            throw new Error('user is not following this user');
        }
        user.following.pull(unfollowUser);
        unfollowUser.followers.pull(user);
        await user.save();
        await unfollowUser.save();
        return {user,unfollowUser};
    }catch(error){
        throw error;
    }
}


const addToFavorites = async (songId,userId) =>{
    try{
        const user = await User.findById(userId); 
        const song = await Song.findById(songId);
        if (user.favorites.includes(song)) return console.log("Song is already a favorite");
        user.favorites.push(song);
        return user;
    }catch(error){
        return error;
    }
};

const removeFromFavorites = async (songId,userId) => {
    try{
        const user = await User.findById(userId); 
        const song = await Song.findById(songId);
        if (!user.favorites.includes(song)) return console.log("Song is not a favorite to this user");
        user.favorites.pull(song);
        return user;
    }catch(error){
        return error;
    }
}
export {
    getFollowers,
    followUser, 
    googleAuth,
    register, 
    login ,
    getFollowing,
    unfollowUser,
    addToFavorites,
    removeFromFavorites,
    
};

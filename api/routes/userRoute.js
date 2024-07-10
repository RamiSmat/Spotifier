import express from 'express';
import { registerUser, loginUser,followUserController,getFollowersController,getFollowingController, unfollowUserController} from '../controllers/userController.js';
import passport from 'passport';
import { googleCallback } from '../controllers/userController.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/google/failure' }), googleCallback);

router.get('/google/success', (req, res) => {
    const { token } = req.query; 
    if (token) {
        res.status(200).json({ token }); 
    } else {
        res.status(400).json({ error: 'Token not found in request' });
    }
});
router.get('/google/failure', (req, res) => res.send('Google authentication failed'));
router.post('/:userId/follow/:followuserId',followUserController);
router.get('/:userId/followers',getFollowersController);
router.get('/:userId/following',getFollowingController);
router.post('/:userId/unfollow/:unfollowUserId',unfollowUserController);
export default router;

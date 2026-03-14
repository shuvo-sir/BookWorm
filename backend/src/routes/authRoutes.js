import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });
}

router.post('/register', async(req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide username, email, and password' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        if (username.length < 3) {
            return res.status(400).json({ message: 'Username must be at least 3 characters long' });
        }

        // Check if the email is already registered
        const existingUserName = await User.findOne({ username });
        if (existingUserName) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Check if the email is already registered
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // create new user
        // 1. Generate the avatar URL
        const profileImage = `https://api.dicebear.com/9.x/initials/svg?seed=${username}`;
        const user = new User({
            username,
            email, 
            password,
            profileImage
        });
        await user.save();

        // create JWT token
        const token = generateToken(user._id);
        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            }});

    } catch (error) {
        console.log('Error registering user:', error);
        res.status(500).json({ message: 'internal server error' });
    }
});

router.get('/login', async(req, res) => {
    res.send('User login endpoint');
});


export default router;
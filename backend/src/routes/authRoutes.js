// import express from 'express';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const router = express.Router();

// const generateToken = (userId) => {
//     return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });
// }

// router.post('/register', async(req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         if (!username || !email || !password) {
//             return res.status(400).json({ message: 'Please provide username, email, and password' });
//         }

//         if (password.length < 6) {
//             return res.status(400).json({ message: 'Password must be at least 6 characters long' });
//         }

//         if (username.length < 3) {
//             return res.status(400).json({ message: 'Username must be at least 3 characters long' });
//         }

//         // Check if the email is already registered
//         const existingUserName = await User.findOne({ username });
//         if (existingUserName) {
//             return res.status(400).json({ message: 'Username already exists' });
//         }

//         // Check if the email is already registered
//         const existingEmail = await User.findOne({ email });
//         if (existingEmail) {
//             return res.status(400).json({ message: 'Email already registered' });
//         }

//         // create new user
//         // 1. Generate the avatar URL
//         const profileImage = `https://api.dicebear.com/9.x/initials/svg?seed=${username}`;
//         const user = new User({
//             username,
//             email, 
//             password,
//             profileImage
//         });
//         await user.save();

//         // create JWT token
//         const token = generateToken(user._id);
//         res.status(201).json({
//             token,
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email,
//                 profileImage: user.profileImage
//             }});

//     } catch (error) {
//         console.log('Error registering user:', error);
//         res.status(500).json({ message: 'internal server error' });
//     }
// });


// router.post('/login', async(req, res) => {
//     try {
//         const { email, password } = req.body;
//         if ( !email || !password) {
//             return res.status(400).json({ message: 'Please provide email, and password' });
//         }


//         // Check user exists
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         };

//         // Check password
//         const isPasswordCorrect = await user.comparePassword(password);
//         if (!isPasswordCorrect) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         // create JWT token
//         const token = generateToken(user._id);
//         res.status(200).json({
//             token,
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 email: user.email,
//                 profileImage: user.profileImage
//             }
//         });
//     }
//     catch (error) {
//         console.log('Error logging in user:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }  

        
// });


// export default router;


import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { transporter } from '../lib/nodemailer.js'; // Ensure this path is correct

const router = express.Router();

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '15d' });
}

// --- 1. REGISTER ROUTE ---
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or Email already exists' });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

        const profileImage = `https://api.dicebear.com/9.x/initials/svg?seed=${username}`;

        const user = new User({
            username,
            email,
            password, // Make sure your User model hashes this in a pre-save hook!
            profileImage,
            otp,
            otpExpires,
            isVerified: false // Important: user is locked until verified
        });

        await user.save();

        // Send Email
        await transporter.sendMail({
            from: `"BookWorm 🐛" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify your BookWorm Account",
            html: `<h1>Your code is: ${otp}</h1><p>It expires in 10 minutes.</p>`
        });

        res.status(200).json({ message: 'OTP sent to your email. Please verify.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// --- 2. VERIFY OTP ROUTE ---
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, code } = req.body;

        const user = await User.findOne({ 
            email, 
            otp: code, 
            otpExpires: { $gt: Date.now() } 
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired code' });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const token = generateToken(user._id);
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Verification failed' });
    }
});

// --- 3. RESEND OTP ROUTE ---
router.post('/resend-otp', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: 'User not found' });
        if (user.isVerified) return res.status(400).json({ message: 'Already verified' });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        await transporter.sendMail({
            from: `"BookWorm 🐛" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your NEW Verification Code",
            html: `<h1>New code: ${otp}</h1>`
        });

        res.status(200).json({ message: 'New OTP sent!' });
    } catch (error) {
        res.status(500).json({ message: 'Error resending OTP' });
    }
});

// --- 4. LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if verified before allowing login
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Please verify your email first' });
        }

        const token = generateToken(user._id);
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
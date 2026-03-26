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

// --- 1. REGISTER ROUTE (NO DATABASE SAVE HERE) ---
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if a VERIFIED user already exists
        const verifiedUser = await User.findOne({ email, isVerified: true });
        if (verifiedUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Send Email FIRST. If this fails, the catch block triggers 
        // and NOTHING is saved to the database.
        await transporter.sendMail({
            from: `"BookWorm 🐛" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify your BookWorm Account",
            html: `<h1>Your code is: ${otp}</h1>`
        });

        // We send the OTP back to the Frontend. 
        // The frontend will "hold" this code in memory.
        res.status(200).json({ 
            message: 'OTP sent!', 
            serverOtp: otp 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send email. Try again.' });
    }
});

// --- 2. VERIFY OTP ROUTE (DATABASE SAVE HAPPENS HERE) ---
router.post('/verify-otp', async (req, res) => {
    try {
        const { username, email, password, userCode, serverOtp } = req.body;

        // Compare the code the user typed vs what we sent them
        if (userCode !== serverOtp) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }

        // ONLY NOW do we create the user
        const profileImage = `https://api.dicebear.com/9.x/initials/svg?seed=${username}`;
        
        const user = new User({
            username,
            email,
            password, 
            profileImage,
            isVerified: true 
        });

        await user.save();

        const token = generateToken(user._id);
        res.status(201).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Could not create account' });
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
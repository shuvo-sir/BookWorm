import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true 
    },
    email: {
        type: String,
        required: true,
        unique: true    
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: ""
    },
    isVerified: { type: Boolean, default: false }, // User can't login until this is true
    otp: String,           // The 6-digit code
    otpExpires: Date,      // Expiration time (e.g., 10 mins)
    
},{timestamps: true});

// Hash the password before saving the user
// Removed 'next' as it's not needed for async functions
userSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return; // Just return instead of calling next()
    }
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // No need to call next() here
});

// compare the password for login
userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
}

const User = mongoose.model("User", userSchema);
export default User;
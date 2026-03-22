import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true // Fixed spelling from "require" to "required"
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Fixed: Added quotes and matched model name "User"
        required: true
    }
}, { timestamps: true });

const Book = mongoose.model("Book", bookSchema);
export default Book;
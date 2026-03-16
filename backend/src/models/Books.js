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
        require: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: true
    }
},{timestamps: true});

const Book = mongoose.model("Book", bookSchema);
export default Book;
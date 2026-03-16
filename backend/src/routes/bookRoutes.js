import express from "express";
import cloudinary from "../lib/cloudinary";
import Book from "../models/Book";


const router = express.Router();

router.post("/",protectRoute, async (req, res) => {
    try {
        const { title, caption, image, rating } = req.body;
        if (!title || !caption || !image || !rating) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Upload the image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        const imgUrl = uploadResponse.secure_url;

        // Create a new book entry in the database
        const newBook = new Book({
            title,
            caption,
            rating,
            image: imgUrl,
            user: req.user._id
        })
        
    } catch (error) {
        console.log(error, "Error creating book");
        res.status(500).json({ message: "Error creating book" });
    }
});


router.get("/", protectRoute, async (req, res) => {
    try {
        const page = req.query.page || 1; // Default to page 1 if not provided
        const limit = 5;
        const skip = (page - 1) * limit;

        const books = await Book.find()
        .sort({ createdAt: -1 })
        .skip(skip).limit(limit)
        .populate("user", "username profileImage"); // Sort by creation date, newest first

        const totalBooks = await Book.countDocuments();
        res.send({
            books,
            currentPage: page,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit)
        });
    } catch (error) {
        console.log(error, "Error fetching books");
        res.status(500).json({ message: "Error fetching books" });
    }
});


// get recommendations book in login user 

router.get("/user", protectRoute, async (req, res) => {
    try {
        const userBooks = await Book.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(userBooks);
    } catch (error) {
        console.error(error, "Error fetching user's books");
        res.status(500).json({ message: "Error fetching user's books" });
    }
});


// delete a book
router.delete("/:id", protectRoute, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        // Check if the user is the owner of the book recommendation
        if (book.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // delete the image from Cloudinary
        if (book.image && book.image.includes("cloudinary")) {
            try {
                const publicId = book.image.split("/").pop().split(".")[0]; // Extract public ID from the URL
                await cloudinary.uploader.destroy(publicId);
            } catch (deleteError) {
                console.error(deleteError, "Error deleting image from Cloudinary");
            }
        }
        await book.deleteOne();
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        console.log(error, "Error deleting book");
        res.status(500).json({ message: "Error deleting book" });
    }
});

export default router;
import express from 'express';
import "dotenv/config";
import authRoutes from './routes/authRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import {connectDB} from './lib/db.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// ADD THIS: This allows your app to read req.body
app.use(express.json()); 
app.use(cors()); // Enable CORS for all routes

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
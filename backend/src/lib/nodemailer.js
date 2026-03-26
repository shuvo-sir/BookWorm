import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Changed from 587 to 465
  secure: true, // Use SSL for port 465
  auth: {
    user: process.env.EMAIL_USER,
    // Ensure this has NO spaces: "daxvoxtyzzncknah"
    pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s/g, "") : "",
  },
  // ADD THESE TIMEOUTS SO RENDER DOESN'T GIVE UP
  connectionTimeout: 20000, // 20 seconds
  greetingTimeout: 20000,
  socketTimeout: 20000,
  tls: {
    rejectUnauthorized: false // This bypasses some network security blocks
  }
});

// TEST THE CONNECTION IMMEDIATELY
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ NODEMAILER ERROR:", error.message);
  } else {
    console.log("✅ NODEMAILER IS LIVE");
  }
});
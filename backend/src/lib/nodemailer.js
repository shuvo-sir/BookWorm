import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 10000,   // 10 seconds
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS.replace(/\s/g, ""), 
  },
  tls: {
    rejectUnauthorized: false // Helps bypass network blocks
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
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    // Automatically removes spaces from your 'daxv oxty zznc knah'
    pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s/g, "") : "",
  },
  tls: {
    // This allows the connection even if your network has strict security
    rejectUnauthorized: false 
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
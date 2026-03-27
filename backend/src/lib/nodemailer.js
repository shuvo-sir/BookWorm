import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  // Direct IPv4 for smtp.gmail.com (74.125.136.108 is a standard Gmail SMTP IP)
  host: "74.125.136.108", 
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    // Ensure this is exactly your 16-char App Password (no spaces)
    pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s/g, "") : "",
  },
  // --- FORCING IPV4 ---
  family: 4, 
  // -------------------
  tls: {
    // Crucial: Tell SSL we are expecting gmail's certificate even though we used an IP
    servername: "smtp.gmail.com",
    rejectUnauthorized: false
  },
  connectionTimeout: 40000,
  greetingTimeout: 40000,
  socketTimeout: 40000
});

// This small block checks if the connection is working
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Mail Server Error:", error);
  } else {
    console.log("✅ Mail Server is ready to send messages");
  }
});
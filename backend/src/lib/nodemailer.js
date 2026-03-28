import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // Try 587 one last time with these specific flags
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s/g, "") : "",
  },
  // --- THE TIMEOUT KILLER ---
  connectionTimeout: 60000, // Give it a full minute
  greetingTimeout: 60000,
  socketTimeout: 60000,
  dnsTimeout: 60000,
  // --------------------------
  tls: {
    rejectUnauthorized: false,
    minVersion: "TLSv1.2"
  }
});
// This small block checks if the connection is working
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Mail Server Error:", error);
  } else {
    console.log("✅ Mail Server is ready to send messages.....");
  }
});
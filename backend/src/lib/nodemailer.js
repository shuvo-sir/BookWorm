import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    // This .replace(/\s/g, "") removes all spaces automatically
    pass: process.env.EMAIL_PASS.replace(/\s/g, ""), 
  },
});
// This small block checks if the connection is working
transporter.verify((error, success) => {
  if (error) {
    console.log("❌ Mail Server Error:", error);
  } else {
    console.log("✅ Mail Server is ready to send messages");
  }
});
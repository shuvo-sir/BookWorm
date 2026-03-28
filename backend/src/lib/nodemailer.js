import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

// Ensure this is the key you got from your shuvohalder2002 account
const resend = new Resend("re_VousJ9hN_9MYQ1axcj47bU41wQY6t3qWP");

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const { data, error } = await resend.emails.send({
      // ⚠️ DO NOT change this from address yet
      from: 'BookWorm <onboarding@resend.dev>', 
      to: [to],
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.log("❌ Resend Error:", error.message);
      throw new Error(error.message);
    }

    console.log("🚀 BOOM! Email sent successfully to:", to);
    console.log("📬 Check your inbox at:", to);
    return data;
  } catch (err) {
    console.error("❌ Backend Error:", err.message);
    throw err;
  }
};
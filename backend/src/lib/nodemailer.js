import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Resend with your key
const resend = new Resend("re_QGXY9mNZ_8nDD1WXt6G5ft1WvzUbTX5T3");

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'BookWorm <onboarding@resend.dev>', // Keep this exactly as is for now
      to: [to],
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error("❌ Resend API Error:", error);
      throw new Error(error.message);
    }

    console.log("✅ Email Sent successfully via Resend:", data.id);
    return data;
  } catch (err) {
    console.error("❌ Fatal Email Error:", err.message);
    throw err;
  }
};
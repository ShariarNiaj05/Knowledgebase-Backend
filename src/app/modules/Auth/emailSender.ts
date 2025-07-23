import nodemailer from "nodemailer";
import config from "../../../config";

const emailSender = async (userEmail: string, html: string) => {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.emailSender.EMAIL,
      pass: config.emailSender.APP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: '"Knowledge Base" <shariarn85@gmail.com>',
    to: userEmail,
    subject: "Reset Your Password via Link",
    text: "You've to reset your password within 5 minutes", // plain‑text body
    html: html, // HTML body
  });

  console.log("Message Sent: %s", info.messageId);
};

export default emailSender;

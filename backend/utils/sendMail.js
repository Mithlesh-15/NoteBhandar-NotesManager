import nodemailer from 'nodemailer'
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASS
  }
});

const sendMail = async (subject, message) => {
  await transporter.sendMail({
    from: `"NoteBhandar" <${process.env.ADMIN_EMAIL}>`,
    to: process.env.ADMIN_EMAIL,
    subject,
    html: message
  });
};

export default sendMail
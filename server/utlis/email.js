// export const sendPasswordResetEmail = async (email, resetToken) => {
//   console.log(`Sending password reset email to ${email} with reset link: http://localhost:3000/reset-password/${resetToken}`);
// };

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e4af32b0c0ba98",
    pass: "26f7ee048051fc",
  },
});

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

  const mailOptions = {
    from: "noreply@example.com",
    to: email,
    subject: "Password Reset Request",
    text: `Please click the following link to reset your password: ${resetLink}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

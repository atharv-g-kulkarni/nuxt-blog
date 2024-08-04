import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
});

export const sendPasswordResetEmail = async (email, resetToken) => {
  const resetLink = `https://66ab67261d839e00088db44a--friday-blog.netlify.app/reset-password/${resetToken}`;

  const mailOptions = {
    from: "noreply@example.com",
    to: email,
    subject: "Password Reset Request",
    text: "Friday Blog Password Reset request mail",
    html: `<p>Please click the following link to reset your password: <a href="${resetLink}">Reset Password</a></p>`,
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

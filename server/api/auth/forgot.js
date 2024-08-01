import { defineEventHandler ,readBody } from "#imports";
import { sendPasswordResetEmail } from "~/server/utlis/email";
import User from "~/server/models/UserSchema";

export default defineEventHandler(async (event) => {
  const { email } = await readBody(event);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const resetToken =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    await sendPasswordResetEmail(email, resetToken);
    return {
      message: "Password reset email sent. Please check your inbox.",
    };
  } catch (error) {
    console.error("Forgot password error:", error);
    throw {
      statusCode: 500,
      message: "An error occurred while processing your request.",
    };
  }
});

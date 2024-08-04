import { defineEventHandler, readBody } from "#imports";
import User from "~/server/models/UserSchema";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const { token, newPassword } = await readBody(event);

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw {
        statusCode: 400,
        message: "Password reset token is invalid or has expired.",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    throw {
      statuCode: 200,
      message:
        "Your password has been reset successfully. You can now log in with your new password.",
    };
  } catch (error) {
    throw {
      status: "Failed",
      message: error.message || "An error occurred while resetting your password.",
    };
  }
});

import bcrypt from "bcrypt";
import User from "~/server/models/UserSchema";
import { defineEventHandler, readBody } from "#imports";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, email, password } = body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw {
        statusCode: 400,
        statusMessage: "User already exists",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    return {
      statusMessage: "User created successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  } catch (error) {
    throw {
      statusCode: 500,
      statusMessage: "An error occurred during signup",
    };
  }
});

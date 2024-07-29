import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "~/server/models/UserSchema";
import { defineEventHandler, readBody } from "#imports";
import { setCookie } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    setCookie(event, "token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60,
      sameSite: "strict",
      path: "/",
    });

    return {
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "An error occurred during login",
    });
  }
});

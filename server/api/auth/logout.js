import { defineEventHandler } from "#imports";
import { setCookie } from "h3";

export default defineEventHandler(async (event) => {
  try {
    setCookie(event, "token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
      sameSite: "strict",
      path: "/",
    });

    return {
      message: "Logout successful",
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: "An error occurred during logout",
    });
  }
});

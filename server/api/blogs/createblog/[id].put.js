import blogSchema from "~/server/models/blogSchema";
import { defineEventHandler, readBody } from "#imports";
import { BlogSchema } from "~/server/models/validation";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    const body = await readBody(event);
    const { error } = BlogSchema.validate(body, {
      abortEarly: true,
      allowUnknown: true,
    });
    if (error) {
      return {
        statusCode: 400,
        statusMessage: error.message.replace(/"/g, ""),
      };
    }
    const response = await blogSchema.findByIdAndUpdate(id, body);
    console.log("hi")
    if (response)
      return { statusCode: 200, statusMessage: "blog updated successfully!" };
    return {
      statusCode: 401,
      statusMessage: "user not found",
    };
  } catch (error) {
    return {
      message: error.message,
    };
  }
});

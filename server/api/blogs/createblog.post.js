import blogSchema from "~/server/models/blogSchema";
import { defineEventHandler, readBody } from "#imports";
import { BlogSchema } from "~/server/models/validation";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { error } = BlogSchema.validate(body, { allowUnknown: true });
    if (error) {
      return {
        statusCode: 400,
        statusMessage: error.message.replace(/"/g, ""),
      };
    }
    const response = await blogSchema.create(body);
    if (response)
      return { statusCode: 200, statusMessage: "blog created successfully!" };
    else
      return {
        statusCode: 500,
        statusMessage: "unable to create blog",
      };
  } catch (error) {
    return {
      statusMessage: error.message,
    };
  }
});

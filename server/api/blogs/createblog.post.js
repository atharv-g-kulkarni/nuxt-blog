import blogSchema from "~/server/models/blogSchema";
import { defineEventHandler, readBody } from "#imports";
import { BlogSchema } from "~/server/models/validation";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    let { error } = BlogSchema.validate(body);
    if (error) {
      throw createError({
        message: error.message.replace(/"/g, ""),
        statusCode: 400,
        fatal: false,
      });
    }
    try {
      await blogSchema.create(body);
      return { message: "blog created successfully!" };
    } catch (createError) {
      console.log(createError.message);
    }
  } catch (e) {
    console.log(e);
  }
});

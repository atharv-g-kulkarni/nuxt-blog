import blogSchema from "~/server/models/blogSchema";
import { defineEventHandler } from "#imports";

export default defineEventHandler(async () => {
  try {
    await blogSchema.find({}).populate();
    return { message: "blogs" };
  } catch (e) {
    console.log(e);
  }
});

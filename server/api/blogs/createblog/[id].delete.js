import blogSchema from "~/server/models/blogSchema";
import { defineEventHandler } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    try {
      await blogSchema.findByIdAndDelete(id);
      return { message: "blog deleted successfully!" };
    } catch (createError) {
      console.log(createError.message);
    }
  } catch (e) {
    console.log(e);
  }
});

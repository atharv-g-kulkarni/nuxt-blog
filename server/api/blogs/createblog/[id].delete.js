import blogSchema from "~/server/models/blogSchema";
import { defineEventHandler } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    const response = await blogSchema.findByIdAndDelete(id);
    if (response)
      return { statusCode: 200, statusMessage: "blog deleted successfully!" };
    else
      return {
        statusMessage: "blog might be deleted",
        statusCode: 401,
      };
  } catch (error) {
    return {
      statusMessage: "blog doesn't exist",
      statusCode: 400,
    };
  }
});

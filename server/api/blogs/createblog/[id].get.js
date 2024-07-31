import { defineEventHandler } from "#imports";
import blogSchema from "~/server/models/blogSchema";

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params.id;
    const result = await blogSchema.findById(id);
    if(result) return result;
    else return {
        statusCode: 404,
        statusMessage: "blog not found",
    }
  } catch (error) {
    return {
        statusCode: 400,
        statusMessage: "blog dosen't exists"
    }
  }
});

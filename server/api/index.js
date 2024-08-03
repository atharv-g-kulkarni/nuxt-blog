import Blogs from "~/server/models/blogSchema";
import { defineEventHandler } from "h3";

export default defineEventHandler(async () => {
  try {
    const blogs = await Blogs.find().sort({ createdAt: -1 });
    return { blogs };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    event.res.statusCode = 500;
    return { error: 'An error occurred while fetching blogs' };
  }
});

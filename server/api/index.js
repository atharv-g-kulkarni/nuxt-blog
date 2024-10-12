import Blogs from "~/server/models/blogSchema";
import { defineEventHandler } from "#imports";

export default defineEventHandler(async () => {
  try {
    const blogs = await Blogs.find().sort({ createdAt: -1 });
    const totalBlogs = await Blogs.countDocuments();
    return { blogs,totalBlogs };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    event.res.statusCode = 500;
    return { error: 'An error occurred while fetching blogs' };
  }
});

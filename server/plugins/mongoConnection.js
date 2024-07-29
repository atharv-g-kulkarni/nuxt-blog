import mongoose from "mongoose";
import { defineNitroPlugin } from "#imports";

export default defineNitroPlugin(async (nitroApp) => {
    const config = useRuntimeConfig()
    try {
      await mongoose.connect(config.MONGO_URI)
      console.log('Connected to MongoDB')
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error)
    }
  })
import { defineEventHandler } from "#imports";
import UserSchema from "~/server/models/UserSchema";
export default defineEventHandler(async(event)=>{
    try {
        const id = event.context.params.id;
        const result = await UserSchema.findById(id);
        if(result) return result;
        else return {
            statusCode: 404,
            statusMessage: "user not found",
        }
      } catch (error) {
        return {
            statusCode: 500,
            statusMessage: error.message,
        }
      }
});
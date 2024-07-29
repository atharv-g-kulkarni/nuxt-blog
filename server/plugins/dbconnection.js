import mongoose from "mongoose";

export default async () => {
  const config = useRuntimeConfig();
  mongoose
    .connect(config.MONGO_URI)
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch((error) => {
      console.log(error);
    });
};

import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    headline: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
    titleImage: {
      type: String,
    },
    createdBy: {
      //later use this
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
      //and remove blow part
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blogs", schema);

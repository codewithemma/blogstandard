import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    title: {
      type: String,
    },
    postContent: {
      type: String,
    },
    metaDesc: {
      type: String,
    },
    topic: {
      type: String,
    },
    keyword: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.models?.Post || mongoose?.model("Post", postSchema);

export default Post;

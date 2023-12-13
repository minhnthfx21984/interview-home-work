const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  author: String,
  createdAt: { type: Date, default: Date.now },
  title: String,
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  content: String,
});

postSchema.pre("save", function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;

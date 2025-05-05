const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  firstname: String,
  username: String,
  post: String,
  date: Date,
  like: Number,
});

const Post = mongoose.model("posts", postSchema);

module.exports = Post;

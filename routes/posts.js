var express = require("express");
var router = express.Router();
const Post = require("../models/posts");

router.post("/post", async function (req, res) {
  const { username, post, firstname } = req.body;
  if (username !== "" && post !== "") {
    const newPost = new Post({
      firstname,
      username,
      post,
      like: 0,
    });
    await newPost.save();
    return res.json({ result: true, firstname, username, post });
  } else {
    return res.json({
      result: false,
      error: "Champ(s) manquant(s) ou erreur de post route",
    });
  }
});
router.post("/removePost/:id", async function (req, res) {
  const { id } = req.params;
  console.log("ID reçu par le backend :", id);
  const deletedPost = await Post.deleteOne({ _id: id });

  if (deletedPost.deletedCount > 0) {
    return res.json({ result: true });
  } else {
    return res.json({ result: false, message: "Post non trouvé" });
  }
});
router.get("/allPosts", async function (req, res) {
  const allPosts = await Post.find({});
  res.json({ allPosts });
});
module.exports = router;

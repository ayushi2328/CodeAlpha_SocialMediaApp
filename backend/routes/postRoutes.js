const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

/* ======================
   CREATE POST
====================== */

router.post("/", async (req, res) => {
  try {
    const post = new Post(req.body);

    await post.save();

    res.json({
      message: "Post Created ✅",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Post Creation Failed ❌",
    });
  }
});

/* ======================
   GET ALL POSTS
====================== */

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();

    res.json(posts);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error Fetching Posts ❌",
    });
  }
});

/* ======================
   DELETE POST
====================== */

router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);

    res.json({
      message: "Post Deleted 🗑️",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Delete Failed ❌",
    });
  }
});

/* ======================
   LIKE POST
====================== */

router.put("/like/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post Not Found ❌",
      });
    }

    post.likes += 1;

    await post.save();

    res.json({
      message: "Post Liked ❤️",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Like Failed ❌",
    });
  }
});

/* ======================
   ADD COMMENT
====================== */

router.put("/comment/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post Not Found ❌",
      });
    }

    post.comments.push({
      text: req.body.text,
    });

    await post.save();

    res.json({
      message: "Comment Added 💬",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Comment Failed ❌",
    });
  }
});

module.exports = router;
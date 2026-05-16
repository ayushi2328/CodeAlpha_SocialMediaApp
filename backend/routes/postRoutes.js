const express =
require("express");

const router =
express.Router();

const Post =
require("../models/Post");

/* CREATE POST */

router.post(
"/",
async (req, res) => {

const post =
new Post(req.body);

await post.save();

res.json({
message:
"Post Created ✅",
});

}
);

module.exports =
router;
/* GET ALL POSTS */

router.get(
"/",
async (req, res) => {

const posts =
await Post.find();

res.json(posts);

}
);
/* DELETE POST */

router.delete(
"/:id",
async (req, res) => {

await Post.findByIdAndDelete(
req.params.id
);

res.json({
message:
"Post Deleted 🗑️",
});

}
);
/* LIKE POST */

router.put(
"/like/:id",
async (req, res) => {

const post =
await Post.findById(
req.params.id
);

post.likes += 1;

await post.save();

res.json({
message:
"Post Liked ❤️",
});

}
);
/* ADD COMMENT */

router.put(
"/comment/:id",
async (req, res) => {

const post =
await Post.findById(
req.params.id
);

post.comments.push({
text:
req.body.text,
});

await post.save();

res.json({
message:
"Comment Added 💬",
});

}
);
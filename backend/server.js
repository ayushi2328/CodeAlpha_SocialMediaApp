const authRoutes =
require("./routes/authRoutes");

const postRoutes =
require("./routes/postRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
"/api/auth",
authRoutes
);

app.use(
"/api/posts",
postRoutes
);
mongoose.connect(
"mongodb://127.0.0.1:27017/socialmedia"
)
.then(() =>
console.log("MongoDB Connected"))
.catch((err) =>
console.log(err));

app.get("/", (req, res) => {
res.send("Social Media API Running");
});

app.listen(5000, () => {
console.log("Server running on port 5000");
});

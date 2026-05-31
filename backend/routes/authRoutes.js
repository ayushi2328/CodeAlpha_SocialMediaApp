const express = require("express");
const router = express.Router();

const User = require("../models/User");

/* ======================
   REGISTER
====================== */

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();

    res.json({
      message: "User Registered ✅",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Registration Failed ❌",
    });
  }
});

/* ======================
   LOGIN
====================== */

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.json({
        message: "User Not Found ❌",
      });
    }

    res.json({
      message: "Login Successful ✅",
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Login Failed ❌",
    });
  }
});

/* ======================
   FOLLOW USER
====================== */

router.put("/follow/:id", async (req, res) => {
  try {
    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User Not Found ❌",
      });
    }

    user.followers += 1;

    await user.save();

    res.json({
      message: "User Followed 👥",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Follow Failed ❌",
    });
  }
});

module.exports = router;
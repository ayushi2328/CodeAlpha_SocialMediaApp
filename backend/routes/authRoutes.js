const express =
require("express");

const router =
express.Router();

const User =
require("../models/User");

/* REGISTER */

router.post(
"/register",
async (req, res) => {

const user =
new User(req.body);

await user.save();

res.json({
message:
"User Registered ✅",
});

}
);

/* LOGIN */

router.post(
"/login",
async (req, res) => {

const user =
await User.findOne({
email:
req.body.email,
});

if (!user) {

return res.json({
message:
"User Not Found ❌",
});

}

res.json({

message:
"Login Successful ✅",
user,

});
}
);
module.exports = router;
/* FOLLOW USER */

router.put(
"/follow/:id",
async (req, res) => {

const user =
await User.findById(
req.params.id
);

user.followers += 1;

await user.save();

res.json({
message:
"User Followed 👥",
});

}
);
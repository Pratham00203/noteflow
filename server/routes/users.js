const router = require("express").Router();
const User = require("../models/User");
const Note = require("../models/Note");
const Todo = require("../models/Todo");
const auth = require("../middleware/auth");

// @route    PUT api/user/update
// @desc     Update a user
// @access   Private
router.put("/update", auth, async (req, res) => {
  try {
    const { username, email } = req.body;

    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ error: "User account doesn't exists!" });
    }

    await User.findByIdAndUpdate(req.user.id, {
      username: username,
      email: email,
    });

    return res.status(200).json({ msg: "User details updated" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route    DELETE api/user/delete
// @desc     Delete a user
// @access   Private
router.delete("/delete", auth, async (req, res) => {
  try {
    await Note.deleteMany({ userId: req.user.id });
    await User.findByIdAndDelete(req.user.id);

    return res.status(200).json({ msg: "User account deleted" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;

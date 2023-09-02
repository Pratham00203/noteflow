const router = require("express").Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// @route    POST api/auth/register
// @desc     Register a user
// @access   Public
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User account already exists!" });
    }

    const salt = await bcrypt.genSalt(10);

    let hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route    POST api/auth/login
// @desc     Login a user
// @access   Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

// @route    GET api/auth/
// @desc     Get current user
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) return res.status(400).json({ error: "User not found!" });

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;

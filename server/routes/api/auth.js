const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const auth = require("../../middleware/auth");
const User = require("../../models/User");

const router = express.Router();

const jwtSecret = config.get("jwtSecret");

// @route   GET api/auth
// @desc    Get current authenticated user
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email.").isEmail(),
    check("password", "Password is required.").isLength({ min: 1 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (!user) {
        res.status(400).json({
          errors: [{ param: "credentials", msg: "Invalid credentials." }]
        });
      }

      // Return JWT
      const payload = {
        user: {
          id: user.id
        }
      };

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({
          errors: [{ param: "credentials", msg: "Invalid credentials." }]
        });
      }

      jwt.sign(payload, jwtSecret, (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: { username: user.username, email: user.email }
        });
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

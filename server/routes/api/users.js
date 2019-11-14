const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const User = require("../../models/User");
const jwtSecret = config.get("jwtSecret");

// @route   POST api/account
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("username", "Username is required.")
      .not()
      .isEmpty(),
    check(
      "username",
      "Username must consist of 13 characters or less."
    ).isLength({ max: 13 }),
    check("email", "Please include a valid email.").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters."
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({
          errors: [
            {
              param: "credentials",
              msg: "A user with this email already exists"
            }
          ]
        });
      }

      user = new User({
        username,
        email,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return JWT
      const payload = {
        user: {
          id: user.id
        }
      };

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

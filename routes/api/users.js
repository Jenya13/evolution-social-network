const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const user = require("../../models/User");

// @route   Post api/users
// @desc    Register user
// @access  Public
router.post(
  "/",

  // check for name, email and password
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check(
      "password",
      "Please enter password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  (req, res) => {
    // validation for the values that sent
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body);
    res.send("User route");
  }
);

module.exports = router;

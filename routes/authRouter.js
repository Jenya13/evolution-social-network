const express = require('express');
const router = express.Router();
const { authUser, auth } = require('./../controllers/authController');

// @route   GET api/auth
// @desc    test route
// @access  Public
router.route('/').get(auth, authUser);
module.exports = router;

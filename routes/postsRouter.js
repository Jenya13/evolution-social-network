const express = require('express');
const router = express.Router();
const { addPost } = require('./../controllers/postController');
const { auth } = require('./../controllers/authController');

router.route('/').post(auth, addPost);

module.exports = router;

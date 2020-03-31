const express = require('express');
const router = express.Router();
const { signUp, login } = require('../controllers/authController');
const { getUser } = require('./../controllers/userController');

router.route('/signup').post(signUp);
router.route('/login').post(login);

router.route('/:id').get(getUser);

// router.route('/').post(registerUser);

module.exports = router;

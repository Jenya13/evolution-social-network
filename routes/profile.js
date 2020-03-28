const express = require('express');
const router = express.Router();
const { myProfile } = require('./../controllers/profileController');

router.route('/me').get(myProfile);

module.exports = router;

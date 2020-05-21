const express = require('express');
const router = express.Router();
const { auth } = require('./../controllers/authController');
const {
  myProfile,
  createProfile,
  updateProfile,
  getAllProfiles,
  getProfileByUser,
  deleteProfile,
} = require('../controllers/profileController');

router.route('/me').get(auth, myProfile);

router.route('/user/:user_id').get(getProfileByUser);

router
  .route('/')
  .get(getAllProfiles)
  .post(auth, createProfile)
  .patch(auth, updateProfile)
  .delete(auth, deleteProfile);

module.exports = router;

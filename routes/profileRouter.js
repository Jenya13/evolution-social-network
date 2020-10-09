const express = require('express');
const router = express.Router();
const { auth } = require('./../controllers/authController');
// const multer = require('multer');

// const upload = multer({
//   limits: {
//     fileSize: 100000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(jpg | jpeg | png)$/)) {
//       cb(new Error('Please upload image in jpeg or png format'));
//     }
//     cb(undefined, true);
//   },
// });

const {
  myProfile,
  createProfile,
  updateProfile,
  getAllProfiles,
  getProfileByUser,
  deleteProfile,
  updateProfileImage,
  uploudUserAvatar,
  resizeUserAvatar,
} = require('../controllers/profileController');

router.route('/me').get(auth, myProfile);

router.route('/user/:user_id').get(getProfileByUser);

router
  .route('/upload-image')
  .post(auth, uploudUserAvatar, resizeUserAvatar, updateProfileImage);

router
  .route('/')
  .get(getAllProfiles)
  .post(auth, createProfile)
  .patch(auth, updateProfile)
  .delete(auth, deleteProfile);

module.exports = router;

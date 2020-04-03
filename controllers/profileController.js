const Profile = require('./../models/Profile');
const User = require('./../models/User');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

const updateFields = req => {
  const { website, status, skills, youtube, facebook, instagram } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  if (website) profileFields.website = website;
  if (status) profileFields.status = status;
  if (skills)
    profileFields.skills = skills.split(',').map(skill => skill.trim());

  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (facebook) profileFields.social.facebook = facebook;
  if (instagram) profileFields.social.instagram = instagram;

  return profileFields;
};

exports.myProfile = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    'user',
    ['name']
  );

  if (!profile) {
    return next(new AppError('There is no profile for this user', 400));
  }
});

exports.createProfile = catchAsync(async (req, res, next) => {
  const profileFields = updateFields(req);

  profile = await Profile.create(profileFields);

  res.status(201).json({
    status: 'success',
    data: {
      profile
    }
  });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  const profileFields = updateFields(req);

  const profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    { $set: profileFields },
    { new: true, runValidators: true }
  );

  res.status(201).json({
    status: 'success',
    data: {
      profile
    }
  });
});

exports.getAllProfiles = catchAsync(async (req, res, next) => {
  const profiles = await Profile.find().populate('user', ['name']);

  res.status(201).json({
    status: 'success',
    data: {
      profiles
    }
  });
});

exports.getProfileByUser = catchAsync(async (req, res, next) => {
  const profile = await Profile.findOne({
    user: req.params.user_id
  }).populate('user', ['name']);

  if (!profile) {
    return next(new AppError('There is no profile for this user', 400));
  }

  res.status(200).json({
    status: 'success',
    data: {
      profile
    }
  });
});

exports.deleteProfile = catchAsync(async (req, res, next) => {
  // Remove profile
  await Profile.findOneAndRemove({ user: req.user.id });

  // Remove user
  await User.findOneAndRemove({ _id: req.user.id });

  res.status(204).json({});
});

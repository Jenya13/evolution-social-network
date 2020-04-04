const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const User = require('./../models/User');
const Post = require('./../models/Post');
const Profile = require('./../models/Profile');

exports.addPost = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');

  const newPost = {
    text: req.body.text,
    name: user.name,
    user: req.user.id
  };

  const post = await Post.create(newPost);

  res.status(201).json({
    status: 'success',
    data: {
      post
    }
  });
});

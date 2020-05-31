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
    user: req.user.id,
  };

  const post = await Post.create(newPost);

  res.status(201).json({
    status: 'success',
    post,
  });
});

exports.getPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find().sort({ date: -1 });

  res.status(200).json({
    status: 'success',
    posts,
  });
});

exports.getPostById = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  res.status(200).json({
    status: 'success',
    post,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (post.user.toString() !== req.user.id) {
    return next(new AppError('User not authorized', 401));
  }

  await Post.findOneAndRemove({ _id: post._id });

  res.status(204).json({});
});

exports.likePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  // check if user already liked this post
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length > 0
  ) {
    return next(new AppError('Post already liked', 400));
  }

  post.likes.unshift({ user: req.user.id });

  // update likes array
  const updatedPost = await Post.findOneAndUpdate(
    { _id: post._id },
    { $set: { likes: post.likes } },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    likes: updatedPost.likes,
  });
});

exports.unLikePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  // check if user already liked this post
  if (
    post.likes.filter((like) => like.user.toString() === req.user.id).length ===
    0
  ) {
    return next(new AppError('Post has not been yet liked', 400));
  }

  const removeIndex = post.likes
    .map((like) => like.user.toString())
    .indexOf(req.user.id);

  post.likes.splice(removeIndex, 1);

  await post.save();

  res.status(200).json({
    status: 'success',
    likes: post.likes,
  });
});

exports.addComment = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  const post = await Post.findById(req.params.id);

  const newComment = {
    text: req.body.text,
    name: user.name,
    user: req.user.id,
  };

  post.comments.unshift(newComment);

  // update comments
  const updatedPost = await Post.findOneAndUpdate(
    { _id: post._id },
    { $set: { comments: post.comments } },
    { new: true, runValidators: true }
  );

  console.log(updatedPost);
  res.status(201).json({
    status: 'success',
    updatedPost,
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  // pull out comment from the post
  const comment = post.comments.find(
    (comment) => comment.id === req.params.comment_id
  );

  if (!comment) {
    return next(new AppError('Comment does not exist', 404));
  }

  if (comment.user.toString() !== req.user.id) {
    return next(new AppError('User not authorized', 401));
  }

  const removeIndex = post.comments
    .map((comment) => comment.user.toString())
    .indexOf(req.user.id);

  post.comments.splice(removeIndex, 1);

  await post.save();

  res.status(204).json({});
});

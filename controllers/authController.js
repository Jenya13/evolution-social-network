const User = require('./../models/User');
const AppError = require('./../utils/appError');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const util = require('util');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // check if user exist and the password correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect user or password ', 401));
  }

  // send token to client if every thing correct
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.auth = catchAsync(async (req, res, next) => {
  // 1. getting token if it exist
  const token = req.header('x-auth-token');

  if (!token) {
    return next(new AppError('No token, authorization denied', 401));
  }

  // 2. validate the token - verification
  const decoded = await util.promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  // 3. check if user still exist
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new AppError('User no longer exist', 401));
  }

  req.user = user;
  next();
});

exports.authUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

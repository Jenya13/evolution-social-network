const User = require('./../models/User');
const catchAsync = require('./../utils/catchAsync');

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.query.id);

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

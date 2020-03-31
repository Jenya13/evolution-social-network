const User = require('./../models/User');
const catchAsync = require('./../utils/catchAsync');

exports.getUser = catchAsync(async (req, res, next) => {
  console.log(req.query.id);
  const user = await User.findById(req.query.id);

  res.status(201).json({
    status: 'success',
    data: {
      user
    }
  });
});

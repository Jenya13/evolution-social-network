const Profile = require('./../models/Profile');
const User = require('./../models/User');

exports.myProfile = async (req, res) => {
  try {
    // const profile = await Profile.findOne({ user: req.user.id });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err
    });
  }
};

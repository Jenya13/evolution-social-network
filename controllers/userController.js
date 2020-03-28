const User = require('./../models/User');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      throw 'This user already exist';
    }

    const newUser = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      data: newUser
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err
    });
  }
};

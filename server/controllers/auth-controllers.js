const { User } = require('./../models');
const util = require('util');
const jwt = require('jsonwebtoken');

jwt.sign = util.promisify(jwt.sign);

exports.signin = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(400).json({
      message: 'Invalid username / password',
    });
  }
  
  const match = user.matchPassword(req.body.password);
  if (match) {
    const token = await sign(
      {
        id: user.id,
        username: user.username,
      },
      process.env.SECRET_KEY
    );

    res.status(200).json({
      message: 'Signed In Successfully',
      token,
    });
  } else {
    res.status(400).json({
      message: 'Invalid username / password',
    });
  }
};

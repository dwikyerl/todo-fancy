const { User } = require('./../models');
const util = require('util');
const axios = require('axios');
const jwt = require('jsonwebtoken');

jwt.sign = util.promisify(jwt.sign);

exports.signin = async (req, res) => {
  const user = await User.isValidUser(req.body.username);
  if (!user) {
    return res.status(400).json({
      message: 'Invalid username / email / password',
    });
  }
  
  const match = await user.matchPassword(req.body.password);
  if (match) {
    const token = await jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email
      },
      process.env.SECRET_KEY
    );

    res.status(200).json({
      message: 'Signed In Successfully',
      token,
    });
  } else {
    res.status(400).json({
      message: 'Invalid username / email / password',
    });
  }
};

exports.fbSignin = async (req, res) => {
  const { data } = await axios.get('https://graph.facebook.com/me?fields=id,name,email,first_name', {
    headers: {
      'Authorization': `Bearer ${req.body.accessToken}`
    }
  });
  
  let user = await User.findOne({ email: data.email });

  if (!user) {
    const username = data['first_name'].toLowerCase() + data.id;
    const signUpData = {
      username,
      email: data.email
    };

    user = User.create(signUpData);
  }

  const token = await jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email
    },
    process.env.SECRET_KEY
  );

  res.status(200).json({
    message: 'Signed In Successfully',
    token,
  });
}

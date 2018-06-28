const { User } = require('./../models');

exports.signUp = async (req, res) => {
  const signUpData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  await User.create(signUpData);
  
  res.status(200).json({ message: 'User created successfully' })
};

exports.userInfo = async (req, res) => {
  const user = {
    username: req.user.username,
    email: req.user.username,
  }

  res.status(200).json({ 
    message: 'User info retrieved successfully', 
    user 
  });
}

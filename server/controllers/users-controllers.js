const { User } = require('./../models');

exports.validateRegister = (req, res, next) => {
  const data = Object.keys(req.body).reduce((acc, prop) => {
    acc[prop] = req.body[prop].trim();
    return acc;
  }, {});
  const errors = [];

  if (!data.username || data.username === '') {
    errors.push({
      err: 'Username is empty',
      message: 'Username is required',
    });
  }

  if (data.username && !/^\w{6,}$/.test(data.username)) {
    errors.push({
      err: 'Invalid Username',
      message: 'Username must 6 characters minimum and does not contain any spaces',
    });
  }

  if (!data.email || data.email === '') {
    errors.push({
      err: 'Email is empty',
      message: 'Email is required',
    });
  }

  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email)) {
    errors.push({
      err: 'Invalid email',
      message: 'email is invalid',
    });
  }

  if (!data.password || data.password === '') {
    errors.push({
      err: 'Password is empty',
      message: 'Password is required',
    });
  }

  if (!data['password-confirm'] || data['password-confirm'] === '') {
    errors.push({
      err: 'Password confirmation is empty',
      message: 'Password confirmation is required',
    });
  }

  if (data.password && !/^\w{6,}$/.test(data.password)) {
    errors.push({
      err: 'Invalid Password',
      message: 'Password must 6 characters minimum and does not contain any spaces',
    });
  }

  if (data.password && data['password-confirm'] && data.password !== data['password-confirm']) {
    errors.push({
      err: 'Passwords do not match',
      message: 'Passwords do not match',
    });
  }

  if (errors.length > 0) res.status(400).json({ errors });
  next();
};

exports.signUp = async (req, res, next) => {
  const signUpData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  await User.create(signUpData);

  next();
};

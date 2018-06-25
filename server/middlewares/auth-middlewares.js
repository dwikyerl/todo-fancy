const jwt = require('jsonwebtoken');
const util = require('util');

jwt.verify = util.promisify(jwt.verify);

exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};

exports.authorizeUser = async (req, res, next) => {
  const user = await verifyToken(req.token, process.env.SECRET_KEY);

  if (!user) res.status(400).json({ message: 'Invalid Token' });

  req.user = user;

  next();
};
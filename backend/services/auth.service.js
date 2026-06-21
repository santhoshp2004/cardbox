const User = require('../models/User');
const jwt = require('jsonwebtoken');
const appKeys = require('../config/app.keys');

const generateToken = (id) => {
  return jwt.sign({ id }, appKeys.jwtSecret, {
    expiresIn: appKeys.jwtExpiration
  });
};

const login = async (usernameOrEmail, password) => {
  const user = await User.findOne({
    $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
  }).select('+password');
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  if (user.status !== 'ACTIVE') {
    throw new Error('Account disabled');
  }

  // update last login
  user.lastLogin = Date.now();
  await user.save({ validateBeforeSave: false });

  const token = generateToken(user._id);
  const userObj = user.toObject();
  delete userObj.password;

  return { user: userObj, token };
};

module.exports = { login };

const jwt = require('jsonwebtoken');
const appKeys = require('../config/app.keys');
const User = require('../models/User');
const sendResponse = require('../utils/response');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    return sendResponse(res, 401, false, 'Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, appKeys.jwtSecret);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return sendResponse(res, 401, false, 'Not authorized, user not found');
    }
    next();
  } catch (error) {
    return sendResponse(res, 401, false, 'Not authorized, token failed');
  }
};

module.exports = { protect };

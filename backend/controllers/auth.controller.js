const authService = require('../services/auth.service');
const sendResponse = require('../utils/response');

const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Using email or username
    if (!email || !password) {
      return sendResponse(res, 400, false, 'Please provide email and password');
    }
    const result = await authService.login(email, password);
    return sendResponse(res, 200, true, 'Login successful', result);
  } catch (error) {
    return sendResponse(res, 401, false, error.message);
  }
};

const getMe = async (req, res) => {
  try {
    return sendResponse(res, 200, true, 'Profile fetched', req.user);
  } catch (error) {
    return sendResponse(res, 500, false, 'Server error');
  }
};

module.exports = { login, getMe };

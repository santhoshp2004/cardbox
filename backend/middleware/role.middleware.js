const sendResponse = require('../utils/response');

const authorize = (...roles) => {
  return (req, res, next) => {
    // Map SA, ML, EL to the lowercase versions as used in new setup or vice-versa
    const userRole = req.user.role.toUpperCase();
    const allowedRoles = roles.map(r => r.toUpperCase());
    
    if (!allowedRoles.includes(userRole)) {
      return sendResponse(res, 403, false, `User role ${req.user.role} is not authorized to access this route`);
    }
    next();
  };
};

module.exports = { authorize };

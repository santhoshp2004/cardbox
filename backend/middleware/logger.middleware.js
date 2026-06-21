const logger = require('../utils/logger');

const actionLogger = (actionName) => {
  return async (req, res, next) => {
    // Hook into res.on('finish') to log after response is sent
    res.on('finish', () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        let details = {
          method: req.method,
          url: req.originalUrl,
          body: req.body, // Be careful not to log passwords!
          params: req.params,
          query: req.query
        };
        // Sanitize password
        if (details.body && details.body.password) {
          details.body.password = '***';
        }
        
        logger(req.user ? req.user._id : null, actionName, details);
      }
    });
    next();
  };
};

module.exports = { actionLogger };

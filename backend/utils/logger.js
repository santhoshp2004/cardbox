const SystemLog = require('../models/SystemLog');

const logger = async (userId, action, details) => {
  try {
    const log = new SystemLog({
      userId,
      action,
      details
    });
    await log.save();
  } catch (error) {
    console.error('Failed to write to system log:', error);
  }
};

module.exports = logger;

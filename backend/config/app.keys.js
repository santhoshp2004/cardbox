module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'super-secret-jwt-key',
  jwtExpiration: process.env.JWT_EXPIRATION || '24h',
};

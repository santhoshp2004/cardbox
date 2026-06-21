const mongoose = require('mongoose');
const dbKeys = require('./db.keys');
const dbConfig = require('./db.config');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbKeys.uri, dbConfig.options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

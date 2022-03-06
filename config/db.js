const mongoose = require('mongoose');

require('dotenv').config()
const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
  } = process.env;

const connectDB = async () => {
    try {
      console.log('connection string', `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`);
      await mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`);
      console.log('Database Connected');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  

module.exports = connectDB;
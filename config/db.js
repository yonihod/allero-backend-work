const mongoose = require('mongoose');

require('dotenv').config()

const connectDB = async () => {
    try {
      console.log('connection string', process.env.MONGO_URI);
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Database Connected');
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };
  

module.exports = connectDB;
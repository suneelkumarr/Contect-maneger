const mongoose = require("mongoose");
const colors = require('colors')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (e) {
    console.error(`Error :${e.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;

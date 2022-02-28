const mongoose = require("mongoose");
const colors = require('colors')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://16eiacs080:16eiacs080@cluster0.1wbxw.mongodb.net/contect_manager?retryWrites=true&w=majority", {
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

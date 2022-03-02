const express = require("express");
const app = express();
require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const path = require("path");
//dotenv.config()
//this is port
const PORT = process.env.PORT || 5000;
//connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
// Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));


// Serve static assets in production
if (process.env.NODE_ENV) {
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build' , 'index.html'));
});
}
else
{
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, "client/build/index.html"))
  }
  );

  // app.use(express.static(path.join(__dirname, '..', 'build')));
  // app.use(express.static('client'));
  // app.get('*', (req, res) =>{
  //   res.sendFile(path.join(__dirname, '..', 'build', 'index.html'))
  // }
  // );
}

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`.yellow.underline);
});

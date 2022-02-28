const express = require('express')
const app = express()
const dotenv = require('dotenv')
const colors = require('colors')
const connectDB = require('./config/db')
dotenv.config()

const PORT =process.env.PORT || 5000
//connect Database
connectDB()

// Init Middleware
app.use(express.json({ extended: false }));
// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
  }

app.listen(PORT,()=>{
console.log(`Server is running on ${PORT}`.yellow.underline)
})
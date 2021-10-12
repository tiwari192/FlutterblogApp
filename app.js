const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

//Connection with MongoDb

mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true });

//Connection Initiated
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDb Connected");
})

//MiddleWare for '/user'
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// '/user' handler
const userRoute = require('./routes/user');
app.use('/user', userRoute);

// '/profile' handler
const profileRoute = require('./routes/profile');
app.use('/profile', profileRoute);


// '/blogPost' handler
const blogPostRoute = require('./routes/blogPost');
app.use('/blogPost', blogPostRoute);


app.get('/', (req, res) => {
    res.send('Welcome to the Rest APi client');
})

app.listen(port, "0.0.0.0", () => {
    console.log('listening on port ', port)
})

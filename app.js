const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000

//Connection with MongoDb

mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true});

//Connection Initiated
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDb Connected");
})

//MiddleWare for '/user'
app.use(express.json());
const userRoute = require('./routes/user');
app.use('/user', userRoute);


app.get('/', (req, res) => {
    res.send('Welcome to the Rest APi client');
})

app.listen(port, () => {
    console.log('listening on port ', port)
})

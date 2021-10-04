const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000

//Connection with MongoDb
mongoose.connect('mongodb://localhost:27017/blog');

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
    res.send('Welcome');
})

app.listen(port, () => {
    console.log('listening on port ', port)
})

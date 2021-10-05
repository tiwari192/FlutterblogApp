const express = require('express')
const mongoose = require('mongoose')


const app = express()
const port = process.env.PORT || 3000

//Connection with MongoDb
const uri = `mongodb+srv://BlogDatabase:BlogPeepals@123@cluster0.e5fzw.mongodb.net/BlogDb?retryWrites=true&w=majority`;
mongoose.connect(uri, {useNewUrlParser: true});

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

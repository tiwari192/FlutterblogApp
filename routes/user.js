const express = require('express')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken');
const middleware = require('../middleware');
const router = express.Router()
require('dotenv').config()

//Log in a user
router.route('/login').post((req, res) => {
    User.findOne(
        {userName : req.body.userName},
        (err, result) => {
            if(err){
                console.log("error");
                return res.status(500).json({msg : err});
            }

            if(result === null){
                return res.status(400).json('Username is incorrect');
            }

            if(result.password == req.body.password){
                //Here we implement JWT Token functionality
                let token = jwt.sign({username : req.body.userName}, JWT_SECRETKEY, {expiresIn : "24h"});
                return res.json({token : token, msg: 'Success'});
            }

            return res.status(400).json('Incorrect Password');

        }

    )
})

//Checking Unique username from database
router.route('/checkusername/:username').get((req, res) => {
    User.findOne(
        {userName: req.params.username},
        (err, result) => {
            if(err) return res.status(500).json({msg : err});
            if(result !== null){
                return res.json({status : 'true'});
            }
            else{
                return res.json({status : 'false'});
            }
        }
    )
})

//Gettng a User from databae
router.route('/:username').get(middleware.checkToken, (req, res) => {
    User.findOne(
        {userName: req.params.username},
        (err, result) => {
            if(err){
                return res.status(500).json({msg : err});
            }
            
            if(result){
                console.log("HEllo");
                return res.json({
                    data : result,
                    username : req.params.username
                });
            }
            
            return res.status(400).json('No such username found');

        }
    )
})

//Adding a new user to database or SignUP
router.route('/register').post((req, res) => {
    console.log("Inside the register");

    //Creating a new instance of User model to be added to database
    const user = User({
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email
    });

    user
        .save()
        .then(() => {
            console.log("User registered");
            return res.status(200).json("ok");
        })
        .catch(err => {
            return res.status(400).json({msg: err});
        })

})

//Endpoint for updating password 
router.route('/update/:username').patch(middleware.checkToken, (req, res) => {
    User.findOneAndUpdate(
        {userName : req.params.username},
        {$set : {password : req.body.password}},
        (err, result) => {
            if(err){
                return res.status(500).json({msg : err});
            }
            
            if(result){
                const msg = {
                msg : "password updated successfully",
                username : req.params.username
                };
                return res.json({msg : msg});
            }

            return res.status(400).json('No such username found');

        }
    )
})


//Deleting a user from the database 
router.route('/delete/:username').delete(middleware.checkToken, (req, res) => {
    User.findOneAndDelete(
        {userName : req.params.username},
        (err, result) => {
            if(err){
                return res.status(500).json({msg : err});
            }
            
            if(result){
                const msg = {
                    msg : "User Delete Successfully",
                    username : req.params.username 
                };
                return res.json({msg : msg});
            }

            return res.status(403).json('No such username found');

        }
    )
})

module.exports = router;
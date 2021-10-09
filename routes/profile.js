const express = require('express')
const Profile = require('../models/profile.model')
const router = express.Router()
const middleware = require('../middleware');
const multer = require('multer');
const path = require('path');
require('dotenv').config()

//For uploading image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, req.decoded.username + ".jpg");
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
    
});
//For uploading image


//adding and updating profile image
router.route('/add/image')
    .patch(middleware.checkToken, upload.single("img"), (req, res) => {

        
        Profile.findOneAndUpdate(
            {userName: req.decoded.username}, 
            {
                $set: {image: req.file.path}
            },
            { new: true },
            (err, profile) => {
                if(err) return res.status(500).send(err);
                if(profile == null) return res.status(400).json({msg: 'username not found'});
                const response = {
                    message: 'image updated successfully',
                    data: profile
                };
                return res.status(200).send(response);
            }
        ).clone();
        

})


//Adding a user profile to database
router.route('/add').post(middleware.checkToken, (req, res) => {

    console.log("Adding profile to database");

    const profile = Profile({
        userName: req.decoded.username,
        name: req.body.name,
        profession: req.body.profession,
        dob: req.body.dob,
        titleline: req.body.titleline,
        about: req.body.about
    });

    profile
            .save()
            .then(() => {
                console.log('Profile added to database');
                return res.status(200).json({msg : "Profile successfully stored"});
            })
            .catch(err => {
                return res.status(400).json({err : err});
            })
})

//Checking if profile data is available
router.route('/checkProfile').get(middleware.checkToken, (req, res) => {
    Profile.findOne(
        {userName: req.decoded.username},
        (err, result) => {
            if(err) return res.json({err: err});
            if(result == null){
                return res.json({status: 'false'});
            }
            else{
                return res.json({status: 'true'});
            }
        }
    );
});

module.exports = router;
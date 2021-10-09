const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        unique: true,
    },
    name: String,
    profession: String,
    dob: String,
    titleline: String,
    about: String,
    image: {
        type: String,
        default: ""
    }
},{
    timestamp: true,

});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
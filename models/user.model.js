const mongoose = require("mongoose");
const validator = require('validator');


const userSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.includes('password')){
                throw new Error('Password cannot contain the literal password')
            }
            else if(value.length <= 6){
                throw new Error('Password must be at least 7 characters')
            }
        }
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email');
            }
        }
    }

})

const User = mongoose.model('User', userSchema);
module.exports = User;
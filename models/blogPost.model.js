const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({

    userName: String,
    title: String,
    body: String,
    coverImage: {
        type: String,
        default: ""
    },
    like: Number,
    share: Number,
    comment: Number

})

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = BlogPost;
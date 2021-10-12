const express = require('express')
const router = express.Router()
const middleware = require('../middleware');
require('dotenv').config()
const BlogPost = require('../models/blogPost.model')

router.route('/add').post(middleware.checkToken, (req, res) => {
    blogpost = BlogPost({
        userName: req.decoded.username,
        title: req.body.title,
        body: req.body.body,
    });

    blogpost
        .save()
        .then((result) => {
            return res.json({ data: result })
        }).catch((err) => {
            return res.json({ err: err })
        });

})

module.exports = router;



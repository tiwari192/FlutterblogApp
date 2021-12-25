const express = require('express')
const router = express.Router()
const middleware = require('../middleware');
require('dotenv').config()
const BlogPost = require('../models/blogPost.model')
const multer = require('multer');


//For uploading image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, req.params.id + ".jpg");
    }
});

// const fileFilter = (req, file, cb) => {
//     if(file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpeg'){
//         cb(null, true);
//     }
//     else{
//         cb(null, false);
//     }
// };

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6,
    },

});
//For uploading image


//adding and updating cover image on blog
router.route('/add/coverImage/:id')
    .patch(middleware.checkToken, upload.single("img"), (req, res) => {


        BlogPost.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: { coverImage: req.file.path }
            },
            { new: true },
            (err, result) => {
                if (err) return res.status(500).send(err);

                else return res.status(200).json(result);
            }
        ).clone();


    });


//Adding blog post
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

//Getting Own Blogs
router.route('/ownBlogs').get(middleware.checkToken, (req, res) => {
    BlogPost.find(
        { userName: req.decoded.username },
        (err, result) => {
            if (err) return res.json(err);
            else return res.json({ data: result });
        })
})


module.exports = router;



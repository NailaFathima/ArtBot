import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary} from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//GET ALL POSTS
router.route('/').get(async (req,res) => {
    try{
        const posts = await Post.find({});
        res.status(200).json({ sucess: true, data: posts})
    } catch(error){
        res.status(500).json({ sucess: false, message: error})
    }
});

//CREATE A POST
router.route('/').post(async (req,res) => {
    try{
        const { name, prompt, photo } = req.body;

    //Instead of directly uploading the photo into the database, we are storing it in cloudinary and then sharing its url
    //to the database. Direct upload will be sufficient in case of few images, but as we scale up we will need more space.
    //Hence we store to urls, for space efficiency.

    const photoUrl = await cloudinary.uploader.upload(photo);

    //These 4 lines will create a new post in our database.
    const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrl.url,
    })

    res.status(201).json({ sucess:true , data:newPost});
    }
    catch (err) {
        res.status(500).json({ success: false, message: error})
    }
});

export default router;
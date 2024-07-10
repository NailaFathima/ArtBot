import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get((req,res) => {
    res.send('hello from DALL-E!');
})

router.route('/').post( async (req,res) => {
    try{
        const {prompt} = req.body;

        const aiResponse = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });

        const image = aiResponse.data[0].b64_json;

        res.status(200).json({photo: image});
    }
    catch(error){
        console.error("Error generating image:", error);
        const errorMessage = error?.response?.data?.error?.message || 'An error occurred while generating the image.';
        res.status(500).json({ error: errorMessage });
    }
})

export default router;






const express = require('express')
const multer = require('multer')
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
require('dotenv').config()

const router = express.Router()

//  cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// multer setup using memory
// saving the uploaded files to the ram as buffer objects rather than sending them to the file system
const storage = multer.memoryStorage()
const upload = multer({storage})

router.post('/', upload.single('image'), async function(req, res){
    try {
        const {file} = req
        if(!file) {
            return res.status(400).json({
                message: 'No file uploaded'
            })
        }

        //  function to handle the upload stream to cloudinary 
        async function streamUpload (fileBuffer) {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((err, result) => {
                    if(result) {
                        resolve(result)
                    } else {
                        reject(err)
                    }
                })

                // use streamifier to convert the file buffer into a stream 
                streamifier.createReadStream(fileBuffer).pipe(stream)
            })
        } 

        // call streamUpload function to upload the file to cloudinary 
        const result = await streamUpload(file.buffer)

        // respond with the uploaded file url if successfull
        res.json({ imageUrl: result.secure_url  })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        })
    }
})

module.exports = router
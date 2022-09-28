const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const reviewController = require('../controllers/reviewController')
const {authentication,authorisation} = require('../middleware/middleware')
const aws = require ('aws-sdk')



router.post('/register', userController.createUser)
router.post('/login', userController.userlogin)


router.post('/books',authentication, authorisation, bookController.createBooks)
router.get('/books', authentication,bookController.getBooksByQuery)
router.get('/books/:bookId',authentication,bookController.getBookById)
router.put('/books/:bookId' ,authentication,authorisation, bookController.updateBooks)
router.delete('/books/:bookId',authentication,authorisation, bookController.deleteBook)

router.post('/books/:bookId/review', reviewController.createReview)
router.put('/books/:bookId/review/:reviewId' , reviewController.updateReview)
router.delete('/books/:bookId/review/:reviewId',reviewController.deleteReview)




// router.all("/**",  (req, res) => {
//     return res.status(400).send({ status: false, msg: "The api you request is not available" })
// });

aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
})



let uploadFiles = async (files) =>    // Upload files and return link
{
    return new Promise( function(resolve, reject){
    let s3= new aws.S3({apiVersion: '2006-03-01'});                                      // It is an standard line by writting this we can access S3 OR we will be using the S3 service of aws
    var uploadParams = {
        ACL : "public-read" ,                                                            // ACL :- Access Control List , By this we are setting who can read it or access it
        Bucket:"classroom-training-bucket",                                              // In our word we say folder in aws folder are calling buckets in aws where we are storing our files
        Key:"abc/" + files.originalname,                                                // Key where we are giving name of files, original name of uploaded file... We can create many folder like "abc/xyz"
        Body : files.buffer                                                             // we are not sending direct file we have to use buffer
    }
    s3.upload( uploadParams, function (err, data ){                                    // we are uploading the params and we are using callback function here we are saying if uploaded successfully then it will call the function if
        if(err) {
            return reject({"error": err})                                                // if error happpens it will give you error
        }
        console.log(data)
        console.log("file uploaded succesfully")
        return resolve(data.Location)                                                   // if we get data we are giving message in console and in data.location we get url
    })
})
}


router.post('/write-files-aws' , async function(req,res)
{
    try{
        let files = req.files
        if(files && files.length >0)
        {
            let uploadedFileUrl = await uploadFiles(files[0])
            res.status(201).send({message: "File uploaded succesfully",data:uploadedFileUrl})
        }
        else{
            return res.status.send(400).send({message:"No file found"})
        }

    }
    catch(err){
        return res.status(500).send({message:err})
    }
})



module.exports = router

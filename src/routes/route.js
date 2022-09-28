const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const reviewController = require('../controllers/reviewController')
const {authentication,authorisation} = require('../middleware/middleware')
const createcover=require("../Aws/Aws")






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

router.post('/write-files-aws',createcover.createcover)


router.all("/**",  (req, res) => {
    return res.status(400).send({ status: false, msg: "The api you request is not available" })
});




module.exports = router

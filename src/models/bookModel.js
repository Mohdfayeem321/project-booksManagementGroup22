const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
        trim:true

    },
    excerpt: {
        type: String,
        required: true,
        trim:true
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    ISBN: {
        type: String,
        required: true,
        unique: true,
        trim:true
    },
    category: {
        type: String,
        required: true,
        trim:true
    },
    subcategory: {
        type: String,
        required: true,
        trim:true
    },
    reviews: {
        type: Number,
        default: 0
    },

    deletedAt:Date,

    isDeleted: {
        type: Boolean,
        default: false

    },

    bookCover: {
        type:String,
        required:true
    },

    releasedAt: {
        type: String,
        required: true,
        trim:true
    }
},

    { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema)

// Assignment:
//  add bookCover(string) key in your bookModel in Book managemt project. When book is being created , take up the book cover as an image , upload it to s3 and save the url in bookCover key. Submit a short explainer video on the same( individually)



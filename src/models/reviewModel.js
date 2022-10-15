const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId  //hexadecimal , bson, 
// model provide crud operations. 
// mongoose.model provide interface // writer of schema
//schema 

const reviewSchema = new mongoose.Schema(
    {
        bookId: {
            type: ObjectId,
            required: true,
            ref: "Book"
        },
        reviewedBy: {
            type: String,
            default: "Guest",
            required: true,
            trim: true,
            value: { type: String, trim: true }
        },

        reviewedAt: {
            type: String,
            default:Math.floor(Date.now()/1000),
            required: true
        },
        rating: {
            type: Number,
            required: true,
            trim:true
        },
        review: {
            type: String,
            trim: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
    },
    { timestamps: true }
)


module.exports = mongoose.model('Review', reviewSchema)

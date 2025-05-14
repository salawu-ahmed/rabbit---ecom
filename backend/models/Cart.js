const mongoose = require('mongoose')
const products = require('../data/product')
const { Schema } = mongoose

const cartItemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name: String,
    image: String,
    price: String,
    size: String,
    color: String,
    quantity: {
        type: Number,
        default: 1
    }
},
    { _id: false }
)

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    guestId: {
        type: String
    },
    products: [cartItemSchema],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Cart', cartSchema)
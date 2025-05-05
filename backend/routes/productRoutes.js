const express = require('express')
const Product = require('../models/Product')
const protect = require('../middleware/authMiddleware')

const router = express.Router()

// @route POST /api/products
// @desc Create a new product
// access private/Admin
router.post('/', protect, async function (req, res) {
    try {
        const {
            name,
            description,
            price:
            discountPrice,
            countInStock,
            category,
            brand,
            material,
            sizes,
            colors,
            collections,
            gender,
            images,
            isFeatured,
            isPublished,
            dimensions,
            tags,
            weight,
            sku 
        } = req.body

        const product = new Product({
            name,
            description,
            price:
            discountPrice,
            countInStock,
            category,
            brand,
            material,
            sizes,
            colors,
            collections,
            gender,
            images,
            isFeatured,
            isPublished,
            dimensions,
            tags,
            weight,
            sku,
            user: req.user._id // reference to the admin user creating the product
        })

        const createdProduct = await product.save();
        res.status(201).json(createdProduct)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
    }
}) 

module.exports = router
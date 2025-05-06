const express = require('express')
const Product = require('../models/Product')
const { protect, admin } = require('../middleware/authMiddleware')

const router = express.Router()

// @route POST /api/products
// @desc Create a new product
// access private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const {
            name,
            description,
            price,
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
            price,
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

//@route PUT api/products/:id
//@desc update an existing product using its id 
//@access Pivat/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const {
            name,
            description,
            price,
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

        let product = await Product.findById(req.params.id)

        if(product) {
            product.name = name || product.name
            product.description = description || product.description
            product.price = price || product.price
            product.discountPrice = discountPrice || product.discountPrice
            product.countInStock = countInStock || product.countInStock
            product.category = category || product.category
            product.brand = brand || product.brand
            product.material = material || product.material
            product.sizes = sizes || product.sizes
            product.colors = colors || product.colors
            product.collections = collections || product.collections
            product.gender = gender || product.gender
            product.images = images || product.images
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished
            product.dimensions = dimensions || product.dimensions
            product.sku = sku || product.sku
            product.tags = tags || product.tags
            product.weight = weight || product.weight

            const updatedProduct = await product.save()
            res.json(updatedProduct)
        }else {
            res.status(404).json({
                message: 'Product not found'
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
    }
})


//@route DELETE /api/products/:id
//@desc Delete a product by it's id 
//@access Private/Admin
router.delete('/:id',protect, admin, async function(req, res) {
    try {
        let product = await Product.findById(req.params.id)
        if(product) {
            await product.deleteOne()
            res.json({
                message: 'Product deleted successfully'
            })
        } else {
            res.status(404).json({
                message: 'Product not found'
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
        
    }
})



module.exports = router
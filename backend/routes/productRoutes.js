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

        if (product) {
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


//@route DELETE /api/products/:id
//@desc Delete a product by it's id 
//@access Private/Admin
router.delete('/:id', protect, admin, async function (req, res) {
    try {
        let product = await Product.findById(req.params.id)
        if (product) {
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

// @route GET /api/products/
// @desc Get all products with optional query filters
// @access public
router.get('/', async function (req, res) {
    try {
        const {
            collection,
            size,
            gender,
            minPrice,
            maxPrice,
            sortBy,
            search,
            category,
            material,
            brand,
            color, limit
        } = req.query

        let query = {}

        // filter logic
        // we assign the mongoDB query logic over here 
        if (collection && collection.toLocaleString() !== 'all') {
            query.collections = collection
        }
        if (category && category.toLocaleString() !== 'all') {
            query.category = category
        }
        if (material) {
            query.material = { $in: material.split(',') }
        }
        if (brand) {
            query.brand = { $in: brand.split(',') }
        }
        if (size) {
            query.sizes = { $in: size.split(',') }
        }
        if (color) {
            query.colors = { $in: [color] }
        }
        if (gender) {
            query.gender = gender
        }
        if (minPrice || maxPrice) {
            query.price = {}
            if (minPrice) query.price.$gte = Number(minPrice)
            if (maxPrice) query.price.$lte = Number(maxPrice)
        }
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ]
        }

        // sorting logic
        let sort = {}
        if (sortBy) {
            switch (sortBy) {
                case 'priceAsc':
                    sort = { price: 1 }
                    break;
                case 'priceDesc':
                    sort = { price: -1 }
                    break;
                case 'popularity':
                    sort = { rating: -1 }
                default:
                    break;
            }
        }

        // Fetch products from the database and apply sorting and limit.
        // the mongoDB query logic created at the top is called or passed in here
        let products = await Product.find(query).sort(sort).limit(Number(limit) || 0)
        res.json(products)

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')

    }
})



// @route GET /api/products/best-seller
// @desc Get best selling items based on rating
// @access Public 
router.get('/best-seller', async function (req, res) {
    try {
        const bestSeller = await Product.findOne().sort({ rating: -1 })
        if(bestSeller){
            res.json(bestSeller)
        } else {
            res.status(404).json({
                message: 'No best seller found'
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
        
    }
})


// @route GET /api/products/new-arrivals
// @desc Retrieve latest 8 products based on the creation date (createdAt)
// @access Public
router.get('/new-arrivals', async function(req, res) {
    try {
        // Fetch latest 8 products from the database 
        const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8)
        res.json(newArrivals)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
    }
})



// @route GET /api/products/:id
// @desc Retrieve a product by it's id 
// @access Public
router.get('/:id', async function (req, res) {
    const { id } = req.params
    try {
        let product = await Product.findById(id)
        if (product) {
            res.status(201).json(product)
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

// @route GET /api/products/similar/:id
// @desc Retrieve similar products based on current product's gender and category
// @access Public
router.get('/similar/:id', async function (req, res) {
    const { id } = req.params
    try {
        let product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        let similarProducts = await Product.find({
            _id: { $ne: id }, // excludes the current product id. (ne->not equals)
            gender: product.gender,
            category: product.category
        }).limit(4)

        return res.status(201).json(similarProducts)
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error')
    }
})



module.exports = router
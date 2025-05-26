const express = require('express')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

// helper function to get the cart based on userId or guestId 
async function getCart(userId, guestId) {
    if (userId) {
        return await Cart.findOne({ user: userId })
    } else if (guestId) {
        return await Cart.findOne({ guestId })
    }
    return null
}

// @route POST /api/cart
// @desc add a product to cart for a guest or logged in user 
// @access Public
router.post('/', async function (req, res) {
    const { productId, quantity, size, color, guestId, userId } = req.body
    try {

        const product = await Product.findById(productId)
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }

        // determine if the user is logged in or in guest mode 
        let cart = await getCart(userId, guestId)

        // if the cart exist we first have to update it 
        if (cart) {

            let productIndex = cart?.products?.findIndex((p) => {
                p.productId.toString() === productId &&
                    p.size === size &&
                    p.color === color
            })

            if (productIndex > -1) {
                cart.products[productIndex].quantity += quantity
            } else {
                // add a new product to the cart 
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity
                })
            }

            // recalculate the total price 
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            )

            await cart.save()
            return res.status(200).json(cart)
        }

        // create a new cart for the guest or the user 
        const newCart = await Cart.create({
            user: userId ? userId : undefined,
            guestId: guestId ? guestId : "guest_" + new Date().getTime(),
            products: [
                {
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    color,
                    size,
                    quantity
                }
            ],
            totalPrice: product.price * quantity
        })

        return res.status(201).json(newCart)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        })
    }
})

// @route PUT /api/cart
// @desc update product quantity in the cart for logged in user or guest user 
// @access Public
router.put('/', async function (req, res) {
    const { productId, quantity, size, color, userId, guestId } = req.body
    try {
        let cart = await getCart(userId, guestId)
        if (!cart) {
            return res.status(404).json({
                message: 'Cart not found'
            })
        }

        const productIndex = cart.products.findIndex((p) => {
            return p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
        })

        if (productIndex > -1) {
            // If present update quantity
            if (quantity > 0) {
                // if quantity in request is greater than zero
                cart.products[productIndex].quantity = quantity
            } else {
                cart.products.splice(productIndex, 1) //remove product if quantity from request is zero
            }

            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * quantity,
                0
            )
            await cart.save()
            return res.status(200).json(cart)
        } else {
            return res.status(404).json({
                message: "Product not found in cart "
            })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' })
    }
})


// @route DELETE /api/cart
// @desc remove a product from the cart 
// @access Public 
router.delete('/', async function (req, res) {
    const { productId, size, color, userId, guestId } = req.body
    const { id } = req.params
    try {
        let cart = await getCart(userId, guestId)
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' })
        }

        const productIndex = cart?.products?.findIndex(
            (p) => p.productId.toString() === productId &&
                p.color === color &&
                p.size === size
        )

        if (productIndex > -1) {
            // await cart.products.updateOne({$pull: {products: {$in:{productId}}}})
            cart.products.splice(productIndex, 1)
            cart.totalPrice = cart.products.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            )
            const newCart = await cart.save()
            // console.log(newCart);
            
            return res.status(200).json(newCart)
        } else {
            return res.status(404).json({
                message: 'Product not found in cart'
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' })

    }
})

// @route GET /api/cart
router.get('/', async function (req, res) {
    const { userId, guestId } = req.body
    try {
        const cart = await getCart(userId, guestId)
        if (cart) {
            return res.status(200).json(cart)
        } else {
            return res.status(404).json({ message: 'Cart not found' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' })
    }
})

// @desc merge guest cart into user cart on login 
router.post('/merge', protect, async function (req, res) {
    const { guestId } = req.body
    try {
        // find gurest and user id 
        const guestCart = await Cart.findOne({ guestId })
        const userCart = await Cart.findOne({ user: req.user._id })

        if (guestCart) {
            if (guestCart.products.length === 0) {
                return res.status(400).json({ message: 'Guest cart is empty' })
            }
            if (userCart) {
                // Merge guest cart into user cart
                guestCart.products.forEach((guestCartitem) => {
                    const productIndex = userCart.products.findIndex((item) => {
                        return item.productid.toString() === guestCartitem.productId.toString()
                            && item.size === guestCartItem.size
                    })
    
                    if (productIndex > -1) {
                        // if the item exist in the user cart update the quantity 
                        userCart.products[productIndex].qunatity += guestitem.quantity
                    } else {
                        userCart.products.push(guestItem)
                    }
                })
    
                userCart.totalPrice = userCart.products.reduce((acc, item) => (
                    acc + item.price * item.quantity,
                    0
                ))
                await userCart.save()
    
                // remove guest cart after merging 
                try {
                    await Cart.findOneAndDelete({ guestId })
                } catch (error) {
                    console.error(error);
    
                }
                res.status(200).json(userCart)
            } else {
                // if user has no existing cart, assign the guest cart to the user 
                guestCart.user = req.user._id
                guestCart.guestId = undefined
                await guestCart.save()
    
                res.status(200).json(guestCart)
            }
        }    
         else {
            if (userCart) {
                return res.status(200).json(userCart)
            }
            return res.status(404).json({ message: 'Guest cart not found' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' })
    }
})


module.exports = router
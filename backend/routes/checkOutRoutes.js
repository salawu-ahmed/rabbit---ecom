const express = require('express')
const mongoose = require('mongoose')
const Checkout = require('../models/Checkout')
// const Product = require('../models/Product')
const Cart = require('../models/Cart')
const Order = require('../models/Order')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

// @route POST /api/checkout
// @desc Create a new checkout session
// @access Private
router.post('/', protect, async function (req, res) {
    const { checkOutItems, shippingAddress, paymentMethod, totalPrice } = req.body

    if (!checkOutItems || checkOutItems.length === 0) {
        return res.status(400).json({
            message: 'No items in checkout'
        })
    }    

    try {
        // create a new checkout session 
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkOutItems: checkOutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: 'Pending',
            isPaid: false,
        })
        console.log(`checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout)
    } catch (error) {
        console.error('Error creating checkout session', error);
        res.status(500).json({
            message: 'Server Error'
        })
        
    }
})

// @route
// @desc
// @access
router.put('/:id/pay', protect, async function(req, res){
    const { paymentStatus, paymentDetails} = req.body
    const {id} = req.params
    console.log(id);
    
    try {
        const checkout = await Checkout.findById(id)

        if(!checkout) {
            return res.status(400).json({
                message: 'Checkout not found'
            })
        }

        if(paymentStatus === 'paid') {
            checkout.isPaid = true
            checkout.paymentStatus = paymentStatus
            checkout.paymentDetails = paymentDetails
            checkout.paidAt = Date.now()
            await checkout.save()

            res.status(200).json(checkout)
        } else {
            res.status(400).json({ message: 'Invalid payment status'})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        })
    }
})


// @route PoOST /api/checkout/:id/finalise
// @desc finalise checkout and convert into an order after payment is confirmed 
// @access private 
router.post('/:id/finalise', protect, async function(req, res) {
    try {
        const checkout = await Checkout.findById(req.params.id)

        if(!checkout){
            return res.status(404).json({
                message: 'Checkout not found'
            })
        }

        if(checkout.isPaid && !checkout.isFinalised) {
            // create final order based on the checkout details
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkOutItems,
                shippingAddress:checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt:checkout.paidAt,
                isDelivered: false,
                paymentStatus: 'paid',
                paymentDetails: checkout.paymentDetails
            }) 

            // mark checkout as finalised 
            checkout.isFinalised = true
            checkout.finalisedAt = Date.now()
            await checkout.save()

            // delete the cart associated with the user 
            await Cart.findOneAndDelete({ user: checkout.user})
            res.status(201).json(finalOrder)
        } else if (checkout.isFinalised) {
                res.status(400).json({ message: 'Checkout already finalised'})
        } else {
            res.status(400).json({ message: "Checkout is not paid"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error"})
        
    }
})

module.exports = router
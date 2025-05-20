const express = require('express')
const Order = require('../models/Order')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

// @route GET /api/orders/my-orders
// @route Get logged-in user's orders
// @access private
router.get('/my-orders', protect, async function(req,res) {
    try {
        const orders = await Order.find({ user: req.user._id}).sort({createdAt: -1})
        res.json(orders)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error'})
    }
})


// @route GET /api/orders/:id
// @desc get order details by id 
// @access private 
router.get('/:id', protect, async function(req, res) {
    try {
        const {id} = req.params
        const order = await Order.findById(id).populate("user", "name email")

        if(!order) {
            return res.status(404).json({
                message: 'Order not found'
            })
        }

        res.json(order)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error'
        })
    }
})

module.exports = router
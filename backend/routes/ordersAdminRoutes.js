const express = require('express')
const Order = require('../models/Order')
const { protect, admin } = require('../middleware/authMiddleware')

const router = express.Router()

// @route GET /api/admin/orders
// @desc get all orders
// @access private/admin
router.get('/', protect, admin, async function(req, res) {
    try {
        const orders = await Order.find({}).populate("user", "name email")
        res.json(orders)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' })
    }
})


// @route PUT /api/admin/orders/:id
// @desc Update an order - (admin only)
// @access private/admin
router.put('/:id', protect, admin, async function(req, res){
    const { id } = req.params
    const { status } = req.body
    try {
        const order = await Order.findById(id)
        if(order) {
            order.status = status || order.status
            order.isDelivered = status === "Delivered" ? true : order.isDelivered
            order.deliveredAt = status === "Delivered" ? Date.now() : order.deliveredAt

            const updatedOrder = await order.save()
            res.json(updatedOrder)
        } else {
            res.status(404).json({ message: 'Order not found'})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error'})
    }
})

// @route DELETE /api/admin/order/;id
// @desc delete an order 
// @access private/admin
router.delete('/:id', protect, admin, async function(req, res){
    const { id } = req.params
    try {
        const order = await Order.findById(id)
        if(order){
            await order.deleteOne()
            res.json({ message: 'Order deleted'})
        } else {
            res.status(404).json({ message: 'Order not found' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' })
    }
})

module.exports = router
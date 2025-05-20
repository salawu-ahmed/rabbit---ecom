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

module.exports = router
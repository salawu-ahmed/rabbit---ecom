const express = require('express')
const user = require('../models/User')
const { protect, admin } = require('../middleware/authMiddleware')
const User = require('../models/User')
const router = express.Router()

// @route GET /api/admin/users
// @desc get all users (admin only)
// @access private
router.get('/', protect, admin, async function (req, res) {
    try {
        const users = await User.find({})
        return res.json(users)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' })
    }
})

// @route POST /api/admin/users
// @access private
router.post('/', protect, admin, async function (req, res) {
    let { email, name, password, role } = req.body
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'user already exists' })
        }
        user = new User({
            name,
            email,
            password,
            role: "customer"
        })
        await user.save()
        res.status(201).json({ message: "User created successfully", user})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error'})
    }
})


// @route PUT /api/admin/users/:id
// @desc Update a particular user information - name, email and role
// @access private
router.put('/:id', protect, admin, async function (req, res){
    const { id } = req.params
    const { name, email, role } = req.body
    console.log(role);
    
    try {
        const user = await User.findById(id)
        if(user){
            user.name = name ? name : user.name
            user.email = email ? email : user.email
            user.role = role ? role : user.role
        }
        const updatedUser =  await user.save()
        res.json({ message: 'User updated successfully', updatedUser})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' })
    }
})

// @route DELETE /api/admin/users/:id
// @desc delete a user
// @access private/Admin
router.delete('/:id', protect, admin, async function(req, res){
    const { id } = req.params
    try {
        let user = await User.findById(id)
        if(user){
            await user.deleteOne()
            res.json({ message: 'User deleted successfully'})
        }else {
            return res.status(404).json({ message: 'user not found'})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error'})
    }
})

module.exports = router
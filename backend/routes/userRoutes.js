const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/register', async function (req, res) {
    const {name, email, password, role} = req.body

    try {
        // check if a user already exist with the same mail
        let user = await User.findOne({email})
        // return error if user exist 
        if(user) {
            return res.status(400).send('User already exists with this email')
        }
        // create a new user if user does not already exist 
        user = new User({name,email, password, role})
        await user.save() 

        // creating the jwt token
        const payload = {
            user: {
                _id: user._id,
                role: user.role
            }
        }

        // send a jwt token if user is successfully created 
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '40h'
        }, (err, token) => {
            if(err) throw err;
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }, 
                token: token
            })
        })
    } catch (error) {
        console.log(error);
        res.status(400).send('Server Error')    
    }
})

// @route POST /api/users/login
// @description Authenticate user
// @access public
router.post('/login', async function (req, res) {
    const {email, password} = req.body
    try {
        let user =  await User.findOne({email})
        if (!user) {
            return res.status(400).json({
                msg: 'The email you entered does not exist'
            })
        }
        const isPasswordMatch = user.matchPassword(password)
        if(!isPasswordMatch) {
            return res.status(400).json({
                msg: 'Password is incorrect'
            })
        }

          // creating the jwt token
          const payload = {
            user: {
                _id: user._id,
                role: user.role
            }
        }

        // send a jwt token if user is successfully created 
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '40h'
        }, (err, token) => {
            if(err) throw err;
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }, 
                token: token
            })
        })
    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error')
    }
})

// @route GET /api/users/login
// @desc get logged in user route
// @access Private
router.get('/profile', protect, async function(req, res) {
    res.json(req.user)
})


module.exports = router
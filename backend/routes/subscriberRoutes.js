const express = require('express')
const Subscriber =  require('../models/Subscriber')
const router = express.Router()


// @route POST /api/subscribe
// @desc handle newsletter subscription
// @access public 
router.post('/subscribe',async function(req, res){
    const {email} = req.body
    if(!email) {
        res.status(400).json({message: 'Email is required'})
    }
    try {
        let subscriber = await Subscriber.findOne({ email })
        if(subscriber){
            return res.status(400).json({ message: 'Email is already subscribed' })
        }
        subscriber = new Subscriber({ email })
        await subscriber.save()
        res.status(201).json({ message: 'Thank you for subscribing to our newsletter!'})
    } catch (error) {
        console.error(console.error());
        res.status(500).json({message: 'Server Error'})
    }
})

module.exports = router
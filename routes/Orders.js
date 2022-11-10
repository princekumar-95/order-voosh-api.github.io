const checkAuth = require('../middleware/checkAuth');
const Order = require('../models/Order');
const router = require('express').Router();

// Create Orders - 
router.post('/add-order',checkAuth,async(req,res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error)
    }
});

//Read all Orders - 
router.get('/get-order',checkAuth, async(req,res) => {
    try {
        let Orders = await Order.find();
        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json(error)
    }
});

router.get('/get-order/:user_id',checkAuth, async(req,res) => {
    try {
        let Orders = await Order.find(
            {
                "$or":[
                    {user_id:{ $in:req.params.user_id }}
                ]
            }
        );
        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json(error)
    }
});



module.exports = router;
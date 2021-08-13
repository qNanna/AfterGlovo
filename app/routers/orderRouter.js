const orderController = require('../controllers/orderController.js')
const express = require('express')
const orderRouter = express.Router()

orderRouter.get('/newOrder', async (req, res) => {
    let result = await orderController.oneWayOrder(req.body)
    res.json({result})
})

module.exports = orderRouter
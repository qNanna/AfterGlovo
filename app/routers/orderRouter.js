const orderController = require('../controllers/orderController.js')
const express = require('express')
const orderRouter = express.Router()

orderRouter.get('/', function(req, res) {
	res.render('index', {someInfo: "Данные для передачи"});
});

orderRouter.post('/newOrder', async (req, res) => {
    let result = await orderController.oneWayOrder(req.body)
    console.log(result)
    res.json({result})
})

module.exports = orderRouter
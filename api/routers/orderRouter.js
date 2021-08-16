import express from 'express'

import orderController from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.get('/', (req, res) => orderController.home(req, res))
orderRouter.post('/oneWayOrder', (req, res) => orderController.oneWayOrder(req, res))
orderRouter.post('/estimateOrder', (req, res) => orderController.estimateOrder(req, res))

export default orderRouter

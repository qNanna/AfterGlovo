import express from 'express'

import orderController from '../controllers/orderController.js'

const orderRouter = express.Router()

orderRouter.get('/', (req, res) => orderController.home(req, res))
orderRouter.post('/oneWay', (req, res) => orderController.oneWay(req, res))
orderRouter.post('/estimate', (req, res) => orderController.estimate(req, res))

export default orderRouter

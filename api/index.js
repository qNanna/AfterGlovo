import express from 'express'

import orderRouter from './routers/orderRouter.js'
import configRouter from './routers/serviceRouter.js'

const api = express.Router()

api.use('/v1/orders', orderRouter)
api.use('/dependencies', configRouter)
export default api

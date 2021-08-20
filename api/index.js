import express from 'express'

import orderRouter from './routers/orderRouter.js'
import serviceRouter from './routers/serviceRouter.js'

const api = express.Router()

api.use('/v1/orders', orderRouter)
api.use('/dependencies', serviceRouter)
export default api

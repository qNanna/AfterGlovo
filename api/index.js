import express from 'express'

import orderRouter from './routers/orderRouter.js'

const api = express.Router()

api.use('/v1/orders', orderRouter)

export default api

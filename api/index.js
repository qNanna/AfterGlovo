/* eslint-disable new-cap */
import express from 'express'

import orderRouter from './routers/orderRouter.js'
import { RedisClient, DataBaseOperations } from '../config/index.js'

const api = express.Router()
const knex = new DataBaseOperations().get()
const redisClient = new RedisClient().init()

api.use('/v1/orders', orderRouter)

export { api, redisClient, knex }

/* eslint-disable new-cap */
import express from 'express'

import orderRouter from './routers/orderRouter.js'
import { RedisClient, DataBase } from '../config/index.js'

const api = express.Router()
const knex = new DataBase().get()
const redisClient = new RedisClient().get()

api.use('/v1/orders', orderRouter)

export { api, redisClient, knex }

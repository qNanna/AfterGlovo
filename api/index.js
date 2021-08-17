import chalk from 'chalk'
import express from 'express'
import redis from 'redis'
import asyncRedis from 'async-redis'
import dotenv from 'dotenv'

import orderRouter from './routers/orderRouter.js'
import db from './db.js'

dotenv.config()
const api = express.Router()
const redisClient = redis.createClient()
const asyncRedisClient = asyncRedis.decorate(redisClient)
// eslint-disable-next-line new-cap
const knex = new db(process.env.SQLITE_PATH).get()

asyncRedisClient.on('connect', () => {
  console.info(chalk.blue('Redis client connected', redisClient.address))
  asyncRedisClient.set('headers', JSON.stringify({
    'Content-Type': 'application/json',
    Authorization: process.env.GLOVO_API_AUTH_KEY
  }))
})
asyncRedisClient.on('error', err => console.error(chalk.red('Something went wrong ', err)))

api.use('/v1/orders', orderRouter)

export { api, asyncRedisClient, knex }

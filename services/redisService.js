import chalk from 'chalk'

import { redisClient as redis } from '../api/index.js'

class RedisOperations {
  constructor (data) {
    this.data = data
  } // not used yet

  async setEx (key, lifeTime, value) {
    this.redis = await redis
    this.redis.setex(key, lifeTime, JSON.stringify(value))
    console.log(chalk.yellow(`Saved to Redis for ${lifeTime} seconds: ${value.total.discount.discountId}`))
  }

  async set (key, value) {
    this.redis = await redis
    await this.redis.set(key, JSON.stringify(value))
    console.log(chalk.yellow(`Saved to Redis: ${value.total.discount.discountId}`))
  }

  async get (key) {
    this.redis = redis
    const result = await this.redis.get(key)
    return result
  }
}

export default new RedisOperations()

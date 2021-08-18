import chalk from 'chalk'
import dotenv from 'dotenv'
import redis from 'redis'
import asyncRedis from 'async-redis'
import Knex from 'knex'

const result = dotenv.config()
if (result.error) throw result.error
const { parsed: env } = result

class RedisClient {
  constructor () {
    if (RedisClient.exists) return RedisClient.instance
    RedisClient.instance = this
    RedisClient.exists = true
    this.init()
  }

  async init () {
    const vanillaRedis = redis.createClient()
    this.redisClient = asyncRedis.decorate(vanillaRedis)

    this.redisClient.on('connect', () => console.info(chalk.blue('Redis client connected on', vanillaRedis.address)))
    this.redisClient.on('error', err => console.error(chalk.red('Something went wrong ', err)))
  }

  async getter () {
    return this.redisClient
  }
}

class RedisOperations extends RedisClient {
  constructor (data) {
    super()
    this.data = data
  } // not used yet

  async setEx (key, lifeTime, value) {
    await this.redisClient.setex(key, lifeTime, JSON.stringify(value))
    console.log(chalk.yellow(`Saved to Redis for ${lifeTime} seconds: ${value.total.discount.discountId}`))
  }

  async set (key, value) {
    await this.redisClient.set(key, JSON.stringify(value))
    console.log(chalk.yellow(`Saved to Redis: ${value.total.discount.discountId}`))
  }

  async get (key) {
    const result = await this.redisClient.get(key)
    return JSON.parse(result)
  }
}

class DataBase {
  constructor () {
    if (DataBase.exists) return DataBase.instance
    DataBase.instance = this
    DataBase.exists = true

    this.knex = Knex({
      client: 'sqlite3',
      connection: {
        filename: env.SQLITE_PATH
      },
      useNullAsDefault: true
    })
    this.print()
  }

  async print () {
    console.log(chalk.cyan('SqLite connected on', env.SQLITE_PATH))
  }

  async get () {
    return this.knex
  }
}

class DataBaseOperations extends DataBase {
  constructor (data) {
    super()
    this.data = data
  }

  async createTable (data, name = 'orders') {
    try {
      await this.knex.schema
        .createTable(name, table => {
          table.increments('id')
          table.string('order')
        })
    } catch (err) {
      console.error(chalk.red(err))
    }
  }

  async insertToTable (data, to = 'orders') {
    try {
      console.log(data)
      const insertedRows = await this.knex(to.toString()).insert({ order: data.total.discount.discountId })
      return insertedRows
    } catch (err) {
      console.error(chalk.red(err))
    }
  }
}

const knexClient = new DataBaseOperations().get()
const redisClient = new RedisOperations()

export { knexClient, redisClient, env }

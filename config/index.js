import chalk from 'chalk'
import dotenv from 'dotenv'
import redis from 'redis'
import asyncRedis from 'async-redis'
import Knex from 'knex'

class DotEnv {
  constructor () {
    dotenv.config()
  }

  async print () {
    console.warn(chalk.yellow('dotenv enabled'))
  }
}

class RedisClient extends DotEnv {
  constructor (data) {
    super()
    this.data = data
    this.init()
  }

  async init () {
    const vanillaRedis = redis.createClient()
    this.redisClient = asyncRedis.decorate(vanillaRedis)

    this.redisClient.on('connect', () => {
      console.info(chalk.blue('Redis client connected on', vanillaRedis.address))
      this.redisClient.set('headers', JSON.stringify({
        'Content-Type': 'application/json',
        Authorization: process.env.GLOVO_API_AUTH_KEY
      }))
    })
    this.redisClient.on('error', err => console.error(chalk.red('Something went wrong ', err)))
  }

  async get () {
    return this.redisClient
  }
}

class DataBase extends DotEnv {
  constructor () {
    super()
    this.path = process.env.SQLITE_PATH
    this.knex = Knex({
      client: 'sqlite3',
      connection: {
        filename: this.path
      },
      useNullAsDefault: true
    })
    this.print()
  }

  async print () {
    console.log(chalk.cyan('SqLite connected on', this.path))
  }

  async get () {
    return this.knex
  }
}

export { RedisClient, DataBase }

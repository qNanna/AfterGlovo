// import chalk from 'chalk'
import crypto from 'crypto'

import redis from '../../redis/index.js'
import config from '../../config/index.js'
import glovoService from '../../services/glovoService.js'
import locationService from '../../services/locationLqService.js'

class OrderController {
  constructor (data) {
    this.data = data
  } // not used yet

  async oneWay (req, res) {
    const result = await glovoService.oneWay(req.body, req.method)
    res.json({ result })
  }

  async estimate (req, res) {
    const key = crypto.createHash('sha256').update(JSON.stringify(req.body)).digest('base64')
    let data = await redis.get(key)
    if (!data) {
      const location = await locationService.getLocation(req.body)
      data = await glovoService.estimateOrder(location)
      await redis.setEx(key, config.redisDataLifeTime, data)
    }
    res.json({ data })
  }
}

export default new OrderController()

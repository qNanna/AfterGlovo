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
    const location = await locationService.getLocation(config.locationLqAPIUrl, req.body)
    const discount = await glovoService.estimateOrder(location)
    const key = crypto.createHash('sha256').update(req.body.toString()).digest('base64')
    const result = await redis.get(key)
    if (!result) { await redis.setEx(key, 10, req.body); console.log('DONT HAVE') } else console.log('HAVE')
    res.json({ discount })
  }
}

export default new OrderController()

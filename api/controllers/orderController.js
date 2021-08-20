import redis from '../../redis/index.js'
import config from '../../config/index.js'
import utils from '../../utils/index.js'
import glovoService from '../../services/glovoService.js'
import locationService from '../../services/locationLqService.js'

class OrderController {
  async oneWay (req, res) {
    res.json({ result: 'not yet' })
  }

  async estimate (req, res) {
    const key = utils.getHash(req.body)
    let data = await redis.get(key)
    if (!data) {
      const locationArr = Object.entries(req.body).map(async ([key, el]) => {
        if (key === 'from' || key === 'to') {
          const locations = await locationService.getLocation(el)
          el = { lat: locations.lat, lon: locations.lon }
        }
        return [key, el]
      })
      const location = Object.fromEntries(await Promise.all(locationArr))
      const order = await glovoService.estimateOrder(location.from, location.to)
      data = glovoService.getDiscount(order)
      await redis.setEx(key, config.redisDataLifeTime, data)
    }
    res.json({ data })
  }
}

export default new OrderController()

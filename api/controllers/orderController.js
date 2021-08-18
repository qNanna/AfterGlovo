import glovoService from '../../services/glovoService.js'
import orderService from '../../services/orderService.js'
import { redisClient as redis, env } from '../../config/index.js'

class OrderController {
  constructor (data) {
    this.data = data
  } // not used yet

  async oneWayOrder (req, res) {
    const result = await glovoService.glovoApiSend(`${env.GLOVO_API_DOMAIN}b2b/orders`, req.method, req.body)
    res.json({ result })
  }

  async estimateOrder (req, res) {
    const request = await glovoService.estimateOrder(`${env.GLOVO_API_DOMAIN}b2b/orders/estimate`, req.method, req.body)
    const result = await orderService.getDiscont(request)
    await redis.setEx(result.total.discount.discountId, 300, result)
    // console.log(await redis.get(result.total.discount.discountId))
    res.json({ result })
  }
}

export default new OrderController()

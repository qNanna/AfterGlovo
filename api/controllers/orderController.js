import glovoService from '../../services/glovoService.js'
import orderService from '../../services/orderService.js'

class OrderController {
  constructor (data) {
    this.data = data
  } // not used yet

  async oneWayOrder (req, res) {
    const result = await glovoService.glovoApiSend(`${process.env.GLOVO_API_DOMAIN}b2b/orders`, req.method, req.body)
    res.json({ result })
  }

  async estimateOrder (req, res) {
    const request = await glovoService.estimateOrder(`${process.env.GLOVO_API_DOMAIN}b2b/orders/estimate`, req.method, req.body)
    const result = await orderService.getDiscont(request)
    res.json({ result })
  }
}

export default new OrderController()

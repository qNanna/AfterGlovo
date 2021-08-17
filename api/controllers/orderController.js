import uniqid from 'uniqid'

import orderService from '../../services/glovoService.js'

class OrderController {
  constructor (data) {
    this.data = data
  } // not used yet

  async oneWayOrder (req, res) {
    const result = await orderService.glovoApiSend(`${process.env.GLOVO_API_DOMAIN}b2b/orders`, req.method, req.body)
    res.json({ result })
  }

  async estimateOrder (req, res) {
    const result = await orderService.glovoApiSend(`${process.env.GLOVO_API_DOMAIN}b2b/orders/estimate`, req.method, req.body)
    result.total.discount = { discount: '20%', amount: await orderService.getDiscont(result.total.amount), discountId: uniqid() }
    res.json({ result })
  }
}

export default new OrderController()

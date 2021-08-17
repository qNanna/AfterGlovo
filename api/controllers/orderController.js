import uniqid from 'uniqid'

import orderService from '../services/orderService.js'
import dbController from './dbController.js'

class OrderController {
  constructor (data) {
    this.data = data
  } // not used yet

  async home (req, res) {
    // res.render("index", { someInfo: "Data for send" });
    console.log('?Home page')
  }

  async oneWayOrder (req, res) {
    const result = await orderService.glovoApiSend(`${process.env.GLOVO_API_DOMAIN}b2b/orders`, req.method, req.body)
    res.json({ result })
  }

  async estimateOrder (req, res) {
    const result = await orderService.glovoApiSend(`${process.env.GLOVO_API_DOMAIN}b2b/orders/estimate`, req.method, req.body)
    result.total.discount = { discount: '20%', amount: await orderService.getDiscont(result.total.amount), discountId: uniqid() }
    await dbController.createTable()
    // const dbquery = await dbController.insertToTable(result)
    // console.log(result, ' --> '/*, dbquery*/)
    res.json({ result })
  }
}

export default new OrderController()

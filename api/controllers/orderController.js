import orderService from "../services/orderService.js";

class OrderController {
  constructor (data) {
    this.data = data;
  } // not used yet

  async home (req, res) {
    // res.render("index", { someInfo: "Data for send" });
    console.log("Home page?");
  }

  async oneWayOrder (req, res) {
    const result = await orderService.glovoApiSend("https://api.glovoapp.com/b2b/orders", "POST", req.body);
    res.json({ result });
  }

  async estimateOrder (req, res) {
    const result = await orderService.glovoApiSend("https://api.glovoapp.com/b2b/orders/estimate", "POST", req.body);
    result.total.discount = { discount: "20%", amount: orderService.getDiscont(result.total.amount) };
    res.json({ result });
  }
}

export default new OrderController();

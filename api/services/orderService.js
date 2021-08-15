import fetch from "node-fetch";

class OrderService {
  constructor (data) {
    this.data = data;
  } // not used yet

  async glovoApiSend (url, method, data) {
    try {
      const request = await fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic MTU5NDAyMTA1MDk2MzcyOjdjNDk3NWYyMDQ2OTQ1OWFiMDQ0ZGNmOTE0ZGFkMmE0"
        }
      });
      return request.json();
    } catch (err) {
      console.log(err);
    }
  }

  getDiscont (amount) {
    const total = (amount / 100) * 20; // 20 is pecent %
    return (amount -= total);
  }
}

export default new OrderService();

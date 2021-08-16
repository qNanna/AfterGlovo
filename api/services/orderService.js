import fetch from 'node-fetch'

class OrderService {
  constructor (data) {
    this.data = data
  } // not used yet

  async glovoApiSend (url, method, data) {
    try {
      const request = await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.GLOVO_API_AUTH_KEY
        }
      })
      return request.json()
    } catch (err) {
      console.error(err)
    }
  }

  getDiscont (amount) {
    const total = (amount / 100) * 20 // 20 is pecent %
    return amount - total
  }
}

export default new OrderService()

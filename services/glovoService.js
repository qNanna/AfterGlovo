import chalk from 'chalk'
import fetch from 'node-fetch'
import config from '../config/index.js'

const routes = {
  estimate: `${config.glovoAPIDomain}b2b/orders/estimate`,
  oneWay: `${config.glovoAPIDomain}b2b/orders`
}

class GlovoService {
  constructor (data) {
    this.data = data
  } // not used yet

  // TODO: build request body to GlovoAPI
  async estimateOrder (data) {
    try {
      const request = await fetch(routes.estimate, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: config.glovoAPIKey
        }
      })

      const result = await this.getDiscount(await request.json())
      return result
    } catch (err) {
      console.error(chalk.red(err))
    }
  }

  async getDiscount (data) {
    data.total.amount -= data.total.amount / 100 * config.discount
    return data
  }
}

export default new GlovoService()

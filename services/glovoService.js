import chalk from 'chalk'
import fetch from 'node-fetch'
import config from '../config/index.js'

class GlovoService {
  constructor (data) {
    this.data = data
  } // not used yet

  async estimateOrder (data) {
    try {
      const url = `${config.glovoAPIDomain}b2b/orders/estimate`
      const request = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: config.glovoAPIKey
        }
      })
      const result = await request.json()
      result.total.amount -= result.total.amount / 100 * config.discount
      return result
    } catch (err) {
      console.error(chalk.red(err))
    }
  }
}

export default new GlovoService()

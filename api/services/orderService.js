import chalk from 'chalk'
import fetch from 'node-fetch'

import { asyncRedisClient } from '../index.js'

class GlovoService {
  constructor (data) {
    this.data = data
  } // not used yet

  async glovoApiSend (url, method, data) {
    try {
      const request = await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: JSON.parse(await asyncRedisClient.get('headers'))
      })
      return request.json()
    } catch (err) {
      console.error(chalk.red(err))
    }
  }

  async getDiscont (amount) {
    const total = amount / 100 * 20 // 20 is pecent %
    return amount - total
  }
}

export default new GlovoService()

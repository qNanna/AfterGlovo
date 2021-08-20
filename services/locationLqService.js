import chalk from 'chalk'
import fetch from 'node-fetch'

import config from '../config/index.js'

class LocationLqService {
  async getLocation (data) {
    try {
      const [result] = await this.sendRequest(data)
      return result
    } catch (err) {
      console.error(chalk.red(err))
    }
  }

  async sendRequest (el) {
    const newUrl = config.locationLqAPIUrl.replace('*KEY', config.locationLqAPIKey).replace('*ADRESS', el)
    const data = await fetch(newUrl)
    return data.json()
  }
}

export default new LocationLqService()

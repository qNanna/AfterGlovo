import chalk from 'chalk'
import fetch from 'node-fetch'
import config from '../config/index.js'

class LocationLqService {
  constructor (data) {
    this.data = data
  } // not used yet

  async getLocation (data) {
    try {
      const result = await this.sendRequest(data)
      return result
    } catch (err) {
      console.error(chalk.red(err))
    }
  }

  async sendRequest (el) {
    const newUrl = config.locationLqAPIUrl.replace('*KEY', config.locationLqAPIKey).replace('*ADRESS', el)
    const data = await fetch(newUrl)
    return (await data.json())[0] // [0] because api return all establishments of this address, take first
  }
}

export default new LocationLqService()

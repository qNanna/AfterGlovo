import chalk from 'chalk'
import fetch from 'node-fetch'
import config from '../config/index.js'

class LocationLqService {
  constructor (data) {
    this.data = data
  } // not used yet

  async getLocation (data) {
    try {
      const result = await Object.values(data).map(async (el, index) => {
        const request = await this.sendRequest(await el)
        el = { lat: request.lat, lon: request.lon }
        return el
      })

      return this.buildData(await Promise.all(result))
    } catch (err) {
      console.error(chalk.red(err))
    }
  }

  async sendRequest (el) {
    const newUrl = config.locationLqAPIUrl.replace('*KEY', config.locationLqAPIKey).replace('*ADRESS', el)
    const data = await fetch(newUrl)
    const result = (await data.json())[0] // [0] because api return all establishments of this address, take first
    return result
  }

  async buildData (data, description = 'A 30cm by 30cm box', label = 'Empty') {
    const obj = {
      scheduleTime: null,
      description,
      addresses: [
        { type: 'PICKUP', lat: '', lon: '', label },
        { type: 'DELIVERY', lat: '', lon: '', label }
      ]
    }

    const result = await Object.values(obj.addresses).map(async (el, index) => {
      el.lat = data[index].lat
      el.lon = data[index].lon
      return el
    })

    obj.addresses = await Promise.all(result)
    return obj
  }
}

export default new LocationLqService()

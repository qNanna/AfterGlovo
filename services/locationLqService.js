import chalk from 'chalk'
import fetch from 'node-fetch'
import config from '../config/index.js'

class LocationLqService {
  constructor (data) {
    this.data = data
  } // not used yet

  async getLocation (url, data) {
    try {
      const getRequest = async el => {
        const newUrl = url.replace('*KEY', config.locationLqAPIKey).replace('*ADRESS', el)
        const data = await fetch(newUrl)
        const result = (await data.json())[0] // [0] because api return all establishments of this address, take first
        return result
      }

      const formatData = async () => {
        const elements = Object.values(data.address)
        const result = await data.addresses.map(async (el, index) => {
          const request = await getRequest(await elements[index])
          el.lat = request.lat
          el.lon = request.lon
          return el
        })
        data.addresses = await Promise.all(await result)
        delete data.address
        return data
      }

      const result = await formatData()
      return result
    } catch (err) {
      console.error(chalk.red(err))
    }
  }
}

export default new LocationLqService()

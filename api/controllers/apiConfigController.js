import utils from '../../utils/index.js'
import chalk from 'chalk'

class ApiConfigController {
  constructor (data) {
    this.data = data
  } // not used yet

  async getDependencies (req, res) {
    const data = await utils.readFile('./package.json')
    res.send(Object.keys(data.dependencies))
  }
}

export default new ApiConfigController()

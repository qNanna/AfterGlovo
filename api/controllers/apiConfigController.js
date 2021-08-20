import utils from '../../utils/index.js'

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

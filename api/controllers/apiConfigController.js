import fs from 'fs'

class ApiConfigController {
  constructor (data) {
    this.data = data
  } // not used yet

  async getDependencies (req, res) {
    res.json(JSON.parse(fs.readFileSync('./package.json')))
  }
}

export default new ApiConfigController()

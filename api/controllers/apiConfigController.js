import fs from 'fs'

class ApiConfigController {
  constructor (data) {
    this.data = data
  } // not used yet

  async getDependencies (req, res) {
    fs.readFile('./package.json', (err, data) => {
      if (err) throw err
      const parsedData = JSON.parse(data)
      res.json(Object.keys(parsedData.dependencies))
    })
  }
}

export default new ApiConfigController()

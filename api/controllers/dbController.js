import dbSrvice from '../services/dbService.js'

class DbController {
  constructor (data) {
    this.data = data
  } // not used yet

  async createTable () {
    const result = await dbSrvice.createTable()
    return result
  }

  async insertToTable (data) {
    const result = await dbSrvice.insertToTable(data)
    return result
  }
}

export default new DbController()

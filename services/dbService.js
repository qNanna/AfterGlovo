import chalk from 'chalk'
import DataBase from '../config/index.js'

class DataBaseOperations extends DataBase {
  constructor (data) {
    super()
    this.data = data
  }

  async createTable (data, name = 'orders') {
    try {
      await this.knex.schema
        .createTable(name, table => {
          table.increments('id')
          table.string('order')
        })
    } catch (err) {
      console.error(chalk.red(err))
    }
  }

  async insertToTable (data, to = 'orders') {
    try {
      console.log(data)
      const insertedRows = await this.knex(to.toString()).insert({ order: data.total.discount.discountId })
      return insertedRows
    } catch (err) {
      console.error(chalk.red(err))
    }
  }
}

export default DataBaseOperations
import chalk from 'chalk'
import Knex from 'knex'

class DataBase {
  constructor (path) {
    this.path = path
    this.knex = Knex({
      client: 'sqlite3',
      connection: {
        filename: path
      },
      useNullAsDefault: true
    })
    this.print()
  }

  async print () {
    console.log(chalk.cyan('SqLite connected on', this.path))
  }

  async get () {
    return this.knex
  }
}

class DataBaseOperations extends DataBase {
  constructor (data) {
    super(data)
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

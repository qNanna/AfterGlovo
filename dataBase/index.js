import chalk from 'chalk';
import Knex from 'knex';

import config from '../config/index';

class DataBase {
  constructor() {
    if (DataBase.exists) return DataBase.instance;
    DataBase.instance = this;
    DataBase.exists = true;

    this.knex = Knex({
      client: 'sqlite3',
      connection: {
        filename: config.sqlitePath,
      },
      useNullAsDefault: true,
    });
    this.print();
  }

  // eslint-disable-next-line class-methods-use-this
  print() {
    console.log(chalk.cyan('SqLite connected on', config.sqlitePath));
  }

  getInstance() {
    return this.knex;
  }

  async createTable(data, name = 'orders') {
    try {
      await this.knex.schema
        .createTable(name, (table) => {
          table.increments('id');
          table.string('order');
        });
    } catch (err) {
      console.error(chalk.red(err));
    }
  }

  async insertToTable(data, to = 'orders') {
    try {
      console.log(data);
      const insertedRows = await this.knex(to).insert({ order: data });
      return insertedRows;
    } catch (err) {
      console.error(chalk.red(err));
    }
    return null;
  }
}

export default new DataBase();

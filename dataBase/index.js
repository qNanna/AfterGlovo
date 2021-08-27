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

  print() {
    console.log(chalk.cyan('SqLite connected on', config.sqlitePath));
  }

  getInstance() {
    return this.knex;
  }

  async createTable() {
    await this.knex.schema
      .createTable('users', (table) => {
        table.increments('id');
        table.string('Firstname');
        table.string('Lastname');
        table.integer('Age');
        table.string('Email');
        table.string('Password');
      });
  }

  async insertToTable(data = 'empty', to = 'unknown') {
    return this.knex(to).insert(data);
  }

  async find(value, tableName, prop = 'Email', limit = -1) {
    return this.knex(tableName).select('*').where(prop, value).limit(limit);
  }
}

export default new DataBase();

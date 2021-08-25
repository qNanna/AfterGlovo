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

  async createTable() {
    try {
      await this.knex.schema
        .createTable('users', (table) => {
          table.increments('id');
          table.string('Firstname');
          table.string('Lastname');
          table.string('Email');
        });
    } catch (err) {
      console.error(chalk.red(err));
    }
  }

  async insertToTable(data = 'empty', to = 'unknown') {
    try {
      const insertedRows = await this.knex(to).insert(data);
      return insertedRows;
    } catch (err) {
      console.error(chalk.red(err));
    }
    return null;
  }

  async find(email, tableName) {
    try {
      const result = await this.knex(tableName).select('*').where('Email', email);
      return result;
    } catch (err) {
      console.error(chalk.red(err));
    }
    return null;
  }
}

export default new DataBase();

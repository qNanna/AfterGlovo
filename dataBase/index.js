import Knex from 'knex';

import config from '../config/index';

const db = Knex({
  client: 'sqlite3',
  connection: {
    filename: config.sqlitePath,
  },
  useNullAsDefault: true,
});

export default db;

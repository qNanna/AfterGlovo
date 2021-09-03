import db from './index';

class UserRepository {
  async insertToTable(data = 'empty', tableName = 'users') {
    return db(tableName).insert(data);
  }

  async findOne(value, prop = 'email', tableName = 'users') {
    return db(tableName).select('*').where(prop, value).limit(-1);
  }

  async find(value, tableName = 'users', prop = 'email') {
    return db(tableName).select('*').where(prop, value);
  }
}

export default new UserRepository();

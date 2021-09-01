import db from './index';

class UserRepository {
  async insertToTable(data = 'empty', tableName = 'unknown') {
    return db(tableName).insert(data);
  }

  async find(email, tableName, prop) {
    return db(tableName).select('*').where(prop, email).limit(-1);
  }
}

export default new UserRepository();

import knex from '../dataBase/index';

class DbService {
  async find(email, tableName) {
    const result = await knex.find(email, tableName);
    return result;
  }

  async insert(Firstname, LastName, Email, Age, Password) {
    const data = {
      Firstname, LastName, Email, Age, Password,
    };
    const result = await knex.insertToTable(data, 'users');
    return result;
  }
}

export default new DbService();

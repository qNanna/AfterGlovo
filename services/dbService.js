import knex from '../dataBase/index';

class DbService {
  find(email, tableName) {
    return knex.find(email, tableName);
  }

  insert(Firstname, LastName, Email, Age, Password) {
    const data = {
      Firstname, LastName, Email, Age, Password,
    };
    return knex.insertToTable(data, 'users');
  }
}

export default new DbService();

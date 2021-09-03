import db from '../database/userRepository';
import config from '../config/index';
import utils from '../utils/index';

class UserService {
  async findOne(data, prop) {
    const [result] = await db.findOne(data, prop);
    return result;
  }

  async insert(data) {
    const password = utils.encryptData(data.password, config.cryptoSecretKey);
    const [insert] = await db.insertToTable({ ...data, password }, 'users');
    return insert;
  }
}

export default new UserService();

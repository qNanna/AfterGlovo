import db from '../database/userRepository';
import config from '../config/index';
import utils from '../utils/index';

class UserService {
  async findEmail(data) {
    const [result] = await db.findOne(data);
    return result;
  }

  async insert(data) {
    const password = utils.encryptData(data.password, config.cryptoSecretKey);
    const [insert] = await db.insertToTable({ ...data, password }, 'users');
    return insert;
  }
}

export default new UserService();

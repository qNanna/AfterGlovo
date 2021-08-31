import db from '../database/userRepository';
import config from '../config/index';
import utils from '../utils/index';

class UserService {
  findEmail(email) {
    return db.find(email, 'users', 'email');
  }

  insert(data) {
    const password = utils.encryptData(data.password, config.cryptoSecretKey);
    return db.insertToTable({ ...data, password }, 'users');
  }
}

export default new UserService();

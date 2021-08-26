import utils from '../../utils/index';
import config from '../../config';
import dbService from '../../services/dbService';

class UserController {
  async createUser(req, res) {
    const {
      firstName, lastName, email, age, password,
    } = req.body;

    const userPassword = await utils.encryptData(password, config.cryptoSecretKey);

    const userEmail = email.toLowerCase();
    if (!utils.isEmail(userEmail)) {
      res.status(400).send('Invalid email');
      return;
    }

    const result = await dbService.find(userEmail, 'users');
    if (result.length) {
      res.status(400).send(`User with email: ${email} already exists`);
      return;
    }

    const id = await dbService.insert(firstName, lastName, userEmail, age, userPassword);
    res.send(id);
  }
}

export default new UserController();

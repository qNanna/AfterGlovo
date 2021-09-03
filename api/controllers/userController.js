import chalk from 'chalk';

import config from '../../config';
import utils from '../../utils/index';
import userService from '../../services/userService';
import authService from '../../services/authService';

class UserController {
  async createUser(req, res, next) {
    try {
      const {
        first_name, last_name, email, age, password,
      } = req.body;

      const userEmail = email.toLowerCase();
      if (!utils.isEmail(userEmail)) {
        res.status(400).json('Invalid email');
        return;
      }

      const user = await userService.findEmail(userEmail);
      if (user) {
        res.status(400).json(`User with email: ${email} already exists`);
        return;
      }

      const id = await userService.insert({
        first_name, last_name, email: userEmail, age, password,
      });

      res.status(201).json(id);
    } catch (err) {
      console.error(chalk.red(err));
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        res.status(400).json('All input is required');
      }

      const encryptedPass = utils.encryptData(password, config.cryptoSecretKey);
      const user = await userService.findEmail(email.toLowerCase());
      if (!user || encryptedPass !== user.password) {
        res.status(400).json('Invalid credentials');
        return;
      }

      const result = authService.auth(user);
      res.send(result);
    } catch (err) {
      console.error(chalk.red(err));
      next(err);
    }
  }
}

export default new UserController();

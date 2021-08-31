import chalk from 'chalk';

import utils from '../../utils/index';
import userService from '../../services/userService';

class UserController {
  async createUser(req, res, next) {
    try {
      const {
        first_name, last_name, email, age, password,
      } = req.body;

      const userEmail = email.toLowerCase();
      if (!utils.isEmail(userEmail)) {
        res.status(400).send('Invalid email');
        return;
      }

      const result = await userService.findEmail(userEmail, 'users');
      if (result.length) {
        res.status(400).send(`User with email: ${email} already exists`);
        return;
      }

      const id = await userService.insert({
        first_name, last_name, email: userEmail, age, password,
      });
      res.send(id);
    } catch (err) {
      console.error(chalk.red(err));
      next(err);
    }
  }
}

export default new UserController();

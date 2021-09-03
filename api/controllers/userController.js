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

      const user = await userService.findOne(userEmail);
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

  async getUser(req, res, next) {
    try {
      if (!req.query.id) {
        res.status(400).json('Id is requested');
        return;
      }
      const user = await userService.findOne(req.query.id, 'id');
      if (!user) {
        res.status(400).json(`User with id: ${req.query.id} not found`);
        return;
      }
      delete user.password;
      res.status(200).json(user);
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
        return;
      }

      const encryptedPass = utils.encryptData(password, config.cryptoSecretKey);
      const user = await userService.findOne(email.toLowerCase());
      if (!user || encryptedPass !== user.password) {
        res.status(400).json('Invalid credentials');
        return;
      }

      const result = authService.auth(user);
      const refreshToken = await authService.createRefreshToken(user);
      await userService.updateValue(result.id, 'token', refreshToken.token);

      res.send({ acessToken: result.token, refreshToken });
    } catch (err) {
      console.error(chalk.red(err));
      next(err);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { token, expiryDate, userId: id } = req.body.refreshToken;
      if (!req.body.refreshToken) {
        res.status(403).json({ message: 'Refresh Token is required!' });
        return;
      }
      const refreshToken = await userService.findOne(id, 'id');
      if (!refreshToken || token !== refreshToken.token) {
        res.status(403).json({ message: 'Refresh token is not in database!' });
        return;
      }
      if (expiryDate < new Date().getTime()) {
        await userService.updateValue(id, 'token');
        res.status(403).json('Refresh token was expired. Please make a new signin request');
        return;
      }

      const result = authService.auth(req.body);
      res.status(200).json({
        accessToken: result.token,
        refreshToken: result.refreshToken,
      });
    } catch (err) {
      console.error(chalk.red(err));
      next(err);
    }
  }
}

export default new UserController();

import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import config from '../config/index';

class AuthService {
  async createRefreshToken(user) {
    const expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + config.refreshTokenLife);

    const token = crypto.randomUUID();
    return { token, userId: user.id, expiryDate: expiredAt.getTime() };
  }

  auth(user) {
    const token = jwt.sign(
      { id: user.id },
      config.jwtTokenKey,
      {
        expiresIn: config.jwtTokenLife,
      },
    );
    const data = { ...user, token };
    if (user.password) {
      delete data.password;
    }
    return data;
  }
}
export default new AuthService();

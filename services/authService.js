import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import config from '../config/index';

class AuthService {
  async createRefreshToken(user) {
    const expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + 3600); // 3600 -> 1h

    const token = crypto.randomUUID();
    return { token, userId: user.id, expiryDate: expiredAt.getTime() };
  }

  auth(user) {
    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwtTokenKey,
      {
        expiresIn: '2h',
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

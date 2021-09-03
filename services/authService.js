import jwt from 'jsonwebtoken';

import config from '../config/index';

const auth = (user) => {
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
};

export default { auth };

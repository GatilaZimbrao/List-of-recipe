// var Crypto = require('crypto');

import { createHmac } from 'crypto';

module.exports = {
  encryptPassword: (password: string) => {
    return createHmac('sha256', process.env.JWT_KEY)
      .update(password)
      .digest('hex');
  },
  verifyPassword: (password: string, hash: any) => {
    return (
      createHmac('sha256', process.env.JWT_KEY)
        .update(password)
        .digest('hex') === hash
    );
  },
};

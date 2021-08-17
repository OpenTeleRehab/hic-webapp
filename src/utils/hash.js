export const toHash = (string) => {
  const crypto = require('crypto');
  return crypto.createHash('md5').update(string).digest('hex');
};

import { SHA256 } from 'crypto-js';

export const toHash = (string) => {
  return SHA256(string).toString();
};

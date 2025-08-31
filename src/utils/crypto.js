import { createHash, randomBytes } from 'crypto-browserify';

export const hash = (data) => createHash('sha256').update(data).digest('hex');
export const generateRandomBytes = (size) => randomBytes(size);


import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

class SecretsManager {
  constructor() {
    this.algorithm = 'aes-256-gcm';
    this.keyLength = 32;
    this.ivLength = 16;
    this.saltLength = 64;
    this.tagLength = 16;
    this.masterKeyPath = process.env.MASTER_KEY_PATH || path.join(process.cwd(), '.master.key');
    this.secretsPath = process.env.SECRETS_PATH || path.join(process.cwd(), '.secrets');
  }

  async initialize() {
    if (!fs.existsSync(this.masterKeyPath)) {
      const masterKey = crypto.randomBytes(this.keyLength);
      await promisify(fs.writeFile)(this.masterKeyPath, masterKey);
      await promisify(fs.chmod)(this.masterKeyPath, 0o600);
    }

    if (!fs.existsSync(this.secretsPath)) {
      await promisify(fs.mkdir)(this.secretsPath, { mode: 0o700 });
    }
  }

  async getMasterKey() {
    return await promisify(fs.readFile)(this.masterKeyPath);
  }

  async encrypt(secretName, value) {
    const masterKey = await this.getMasterKey();
    const salt = crypto.randomBytes(this.saltLength);
    const iv = crypto.randomBytes(this.ivLength);
    
    const key = crypto.pbkdf2Sync(masterKey, salt, 100000, this.keyLength, 'sha512');
    const cipher = crypto.createCipheriv(this.algorithm, key, iv);
    
    const encrypted = Buffer.concat([
      cipher.update(value, 'utf8'),
      cipher.final()
    ]);
    
    const tag = cipher.getAuthTag();
    
    const result = Buffer.concat([salt, iv, tag, encrypted]);
    await promisify(fs.writeFile)(
      path.join(this.secretsPath, `${secretName}.enc`),
      result
    );
  }

  async decrypt(secretName) {
    const masterKey = await this.getMasterKey();
    const encrypted = await promisify(fs.readFile)(
      path.join(this.secretsPath, `${secretName}.enc`)
    );
    
    const salt = encrypted.slice(0, this.saltLength);
    const iv = encrypted.slice(this.saltLength, this.saltLength + this.ivLength);
    const tag = encrypted.slice(this.saltLength + this.ivLength, this.saltLength + this.ivLength + this.tagLength);
    const content = encrypted.slice(this.saltLength + this.ivLength + this.tagLength);
    
    const key = crypto.pbkdf2Sync(masterKey, salt, 100000, this.keyLength, 'sha512');
    const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
    decipher.setAuthTag(tag);
    
    return Buffer.concat([
      decipher.update(content),
      decipher.final()
    ]).toString('utf8');
  }

  async listSecrets() {
    const files = await promisify(fs.readdir)(this.secretsPath);
    return files.filter(f => f.endsWith('.enc')).map(f => f.slice(0, -4));
  }
}

export default new SecretsManager();

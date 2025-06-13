const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

class SecureConfigManager {
  constructor() {
    this.configDir = path.join(process.env.HOME, '.sunny');
    this.algorithm = 'aes-256-gcm';
  }

  initialize() {
    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir, { mode: 0o700 });
    }
  }

  encrypt(data, key, iv) {
    const cipher = crypto.createCipheriv(this.algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
    const authTag = cipher.getAuthTag();
    return { encrypted, authTag };
  }

  decrypt(encrypted, key, iv, authTag) {
    const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
    decipher.setAuthTag(authTag);
    return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString('utf8');
  }

  saveConfig(name, data) {
    const fileKey = crypto.randomBytes(32);
    const fileIv = crypto.randomBytes(16);
    const { encrypted, authTag } = this.encrypt(JSON.stringify(data), fileKey, fileIv);

    const saveData = {
      iv: fileIv.toString('hex'),
      key: fileKey.toString('hex'),
      data: encrypted.toString('hex'),
      tag: authTag.toString('hex')
    };

    const configPath = path.join(this.configDir, `${name}.config`);
    fs.writeFileSync(configPath, JSON.stringify(saveData), { mode: 0o600 });
  }

  loadConfig(name) {
    try {
      const configPath = path.join(this.configDir, `${name}.config`);
      const saveData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

      const key = Buffer.from(saveData.key, 'hex');
      const iv = Buffer.from(saveData.iv, 'hex');
      const authTag = Buffer.from(saveData.tag, 'hex');
      const encrypted = Buffer.from(saveData.data, 'hex');

      const decrypted = this.decrypt(encrypted, key, iv, authTag);
      return JSON.parse(decrypted);
    } catch (error) {
      return null;
    }
  }

  deleteConfig(name) {
    const configPath = path.join(this.configDir, `${name}.config`);
    if (fs.existsSync(configPath)) {
      fs.unlinkSync(configPath);
    }
  }
}

module.exports = new SecureConfigManager();

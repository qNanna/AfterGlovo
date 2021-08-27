import crypto from 'crypto';
import fs from 'fs/promises';

function getHash(data, encoding = 'base64', encryption = 'sha256') {
  return crypto.createHash(encryption).update(JSON.stringify(data)).digest(encoding);
}

function encryptData(data, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(key), iv);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

function decryptData(data, key) {
  const textParts = data.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

async function readFile(path) {
  try {
    const buf = await fs.readFile(path);
    return JSON.parse(buf.toString());
  } catch {
    return null;
  }
}

// eslint-disable-next-line no-useless-escape
async function isEmail(mail, reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/) {
  return reg.test(mail);
}

export default {
  getHash,
  readFile,
  isEmail,
  encryptData,
  decryptData,
};

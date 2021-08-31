import crypto from 'crypto';
import fs from 'fs/promises';

// eslint-disable-next-line no-useless-escape
const EMAIL_PATTERN = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const IV = Buffer.from('12345678', 'utf16le'); // 2 bytes per char

function getHash(data, encoding = 'base64', encryption = 'sha256') {
  return crypto.createHash(encryption).update(JSON.stringify(data)).digest(encoding);
}

function encryptData(data, key) {
  const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(key), IV);
  let encrypted = cipher.update(data);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
}

function decryptData(data, key) {
  const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(key), IV);
  let decrypted = decipher.update(Buffer.from(data, 'hex'));
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

function isEmail(mail) {
  return EMAIL_PATTERN.test(mail);
}

export default {
  getHash,
  readFile,
  isEmail,
  encryptData,
  decryptData,
};

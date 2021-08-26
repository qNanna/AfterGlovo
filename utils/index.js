import crypto from 'crypto';
import fs from 'fs/promises';

const iv = crypto.randomBytes(16);

function getHash(data, encoding = 'base64', encryption = 'sha256') {
  return crypto.createHash(encryption).update(JSON.stringify(data)).digest(encoding);
}

function encryptData(data, key) {
  const cipher = crypto.createCipher('aes-128-ctr', key, iv);
  let encryptedData = cipher.update(data, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
}

function decryptData(data, key) {
  const decipher = crypto.createDecipher('aes-128-ctr', key, iv);
  let decryptedData = decipher.update(data, 'hex', 'utf-8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
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

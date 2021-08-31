// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, it } from '@jest/globals';

import utils from '../utils/index';

const EMAIL = 'zap@mail.ru';
const SECRET = 'Anaconda51';
const KEY = 'AJDkm9wzKSKMDnbu7AFO5MoKYACy8nlr';
let DATA;

it('Email valid', () => {
  expect(utils.isEmail(EMAIL)).not.toBe(false);
});

it('Encryption', () => {
  const enc = utils.encryptData(SECRET, KEY);

  expect(SECRET).toBeDefined();
  expect(SECRET).not.toBeNull();
  expect(SECRET).not.toBeUndefined();
  expect(SECRET).not.toBeFalsy();
  expect(KEY).toBeDefined();
  expect(KEY).toHaveLength(32);

  expect(enc).not.toBeNull();
  expect(enc).not.toBeUndefined();
  expect(enc).not.toBeNaN();

  DATA = enc;
});

it('Decryption', () => {
  const dec = utils.decryptData(DATA, KEY);
  expect(dec).not.toBeNull();
  expect(dec).not.toBeUndefined();
  expect(dec).not.toBeNaN();
  expect(dec).toBe(SECRET);
});

// AJDkm9wzKSKMDnbu7AFO5MoKYACy8nlr KEY for enc
// 28a4bad74a5e8939cadf6c8940754a80:cf8b16d7a733d802  enc

/* eslint-disable no-undef */
import utils from '../../utils/index';

const EMAIL = 'zap@mail.ru';
const NOT_EMAIL = 'zapmail.r@u';
const SECRET = 'Anaconda51';
const KEY = 'AJDkm9wzKSKMDnbu7AFO5MoKYACy8nlr';
const ENCRYPTED_SECRET = '31003200330034003500360037003800:abed1c8875350e024075';

describe('Test isEmail', () => {
  it('Should return true for email string', () => {
    expect(utils.isEmail(EMAIL)).toBe(true);
  });

  it('Should return false for non-email string', () => {
    expect(utils.isEmail(NOT_EMAIL)).toBe(false);
  });
});

// TODO: fix encryptData fn to match expected behavior
describe('Test encryptData', () => {
  it('Should encrypt income string', () => {
    expect(utils.encryptData(SECRET, KEY)).toBe(ENCRYPTED_SECRET);
  });

  it('Should return the same encrypted data for the same string', () => {
    expect(utils.encryptData(SECRET, KEY)).toEqual(utils.encryptData(SECRET, KEY));
  });
});

describe('Test decryptData', () => {
  it('Should decrypt income string', () => {
    expect(utils.decryptData(ENCRYPTED_SECRET, KEY)).toBe(SECRET);
  });
});

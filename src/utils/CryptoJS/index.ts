import CryptoJS from 'crypto-js';

const key = '2b7e151628aed2a6abf7158809cf4f3c';

/**
 * @method encrypt 加密
 * @param word 需要加密的字段
 */
export const encrypt = (word: string | CryptoJS.lib.WordArray) =>
  CryptoJS.AES.encrypt(word, key).toString();

/**
 * @method decrypt 解密
 * @param word 需要解密的字段
 */
export const decrypt = (word: string | CryptoJS.lib.CipherParams) =>
  CryptoJS.AES.decrypt(word, key).toString(CryptoJS.enc.Utf8);

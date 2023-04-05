import CryptoJS from 'crypto-js';

const key = '2b7e151628aed2a6abf7158809cf4f3c';

/**
 * @method encrypt 加密
 * @param word 需要加密的字段
 */
export const encrypt = (word: string | CryptoJS.lib.WordArray) => {
  let encrypted = CryptoJS.AES.encrypt(word, key).toString();
  return encrypted;
};

/**
 * @method decrypt 解密
 * @param word 需要解密的字段
 */
export const decrypt = (word: string | CryptoJS.lib.CipherParams) => {
  const decrypted = CryptoJS.AES.decrypt(word, key).toString(CryptoJS.enc.Utf8);
  return decrypted;
};

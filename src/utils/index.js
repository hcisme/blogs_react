export const baseImgUrl =
  window.origin === 'http://127.0.0.1:3001' ? 'http://127.0.0.1:3002' : 'http://81.68.248.232:3002';
export * from './CryptoJS';
export * from './localStorage';
export * from './dictionary';
export { default as axios } from './axiosInterceptors';

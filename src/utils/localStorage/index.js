const loginInfoKeyWordList = ['token', 'userInfo'];

/**
 *
 * @param {string} key
 */
const getLocalStorage = (key) => {
  try {
    localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));
  } catch (error) {
    if (loginInfoKeyWordList.includes(key)) {
      window.location.replace('/g');
    }
  }
  return localStorage.getItem(key) && JSON.parse(localStorage.getItem(key));
};

/**
 *
 * @param {{string, any}}
 */
const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

/**
 *
 * @param {string} key
 */
const removeLocalStorage = (key) => {
  return localStorage.removeItem(key);
};

/**
 *
 * @param {string} key
 */
const getSessionStorage = (key) => {
  return sessionStorage.getItem(key) && JSON.parse(sessionStorage.getItem(key));
};

/**
 *
 * @param {{string, any}}
 */
const setSessionStorage = ({ key, value }) => {
  return sessionStorage.setItem(key, JSON.stringify(value));
};

/**
 *
 * @param {string} key
 */
const removeSessionStorage = (key) => {
  return sessionStorage.removeItem(key);
};

export {
  getLocalStorage,
  setLocalStorage,
  getSessionStorage,
  setSessionStorage,
  removeLocalStorage,
  removeSessionStorage
};

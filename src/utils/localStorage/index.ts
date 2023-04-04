const loginInfoKeyWordList = ['token', 'userInfo'];

export const getLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  try {
    item ? JSON.parse(item) : null;
  } catch (error) {
    if (loginInfoKeyWordList.includes(key)) {
      window.location.replace('/g');
    }
  }
  return item ? JSON.parse(item) : null;
};

export const setLocalStorage = (key: string, value: any) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: string) => {
  return localStorage.removeItem(key);
};

export const getSessionStorage = (key: string) => {
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setSessionStorage = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const removeSessionStorage = (key: string) => {
  return sessionStorage.removeItem(key);
};

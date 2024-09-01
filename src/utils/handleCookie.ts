import Cookies from 'js-cookie';

export const setCookie = (name: string, value: string) => {
  return Cookies.set(name, value, { secure: true });
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const removeCookie = (name: string, domain: string) => {
  return Cookies.remove(name)
};

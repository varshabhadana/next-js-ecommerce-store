import Cookies from 'js-cookie';

export function setStringifiedCookie(key, value) {
  Cookies.set(key, JSON.stringify(value));
}

export function getParsedCookie(key) {
  const cookieValue = Cookies.get(key);

  if (!cookieValue) {
    return undefined;
  }
  try {
    return JSON.parse(cookieValue);
  } catch (error) {
    return undefined;
  }
}

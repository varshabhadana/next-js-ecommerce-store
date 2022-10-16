import Cookies from 'js-cookie';
import { CartData } from '../pages/planters/[planterId]';

export function setStringifiedCookie(key: string, value: CartData[]) {
  Cookies.set(key, JSON.stringify(value));
}

export function getParsedCookie(key: string): CartData[] | undefined {
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

export function deleteCookie(key: string) {
  Cookies.remove(key);
}

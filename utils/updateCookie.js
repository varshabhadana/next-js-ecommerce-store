import { getParsedCookie, setStringifiedCookie } from './cookie';

export function updateCookie(id) {
  const currentCookieValue = getParsedCookie('cart');

  if (currentCookieValue) {
    const foundCookie = currentCookieValue.find((el) => el.id === id);
    foundCookie.count++;

    setStringifiedCookie('cart', currentCookieValue);
  }
}

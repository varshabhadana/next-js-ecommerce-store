export function setLocalStorage(key, value) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getLocalStorage(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    return undefined;
  }
}

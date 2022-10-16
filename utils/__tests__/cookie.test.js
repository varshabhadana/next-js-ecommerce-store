import { deleteCookie, getParsedCookie, setStringifiedCookie } from '../cookie';
import { updateCookie } from '../updateCookie';

test('set, gets and delete a cookie', () => {
  const cookieKey = 'diet';
  const cookieValue = [{ id: 1, count: 2 }];

  // initially the cookie will be undefined
  expect(getParsedCookie(cookieKey)).toBe(undefined);
  // Set the cookie value and test if the value is updated and not throwing any error
  expect(() => setStringifiedCookie(cookieKey, cookieValue)).not.toThrow();
  // Test cookie value, use .toStrictEqual to test that the object have the same type as well as structure
  expect(getParsedCookie(cookieKey)).toStrictEqual(cookieValue);
  // Best practice: clear the state you created after the test to bring the system back to the initial state
  // Delete cookie with deleteCookie function
  expect(deleteCookie(cookieKey)).toBe(undefined);
  // Check if delete function was successful
  expect(getParsedCookie(cookieKey)).toBe(undefined);
});

test('update cookie', () => {
  const cookieKey = 'cart';
  const cookieValue = [{ id: 1, count: 2 }];
  const updatedCookieValue = [{ id: 1, count: 3 }];
  expect(getParsedCookie(cookieKey)).toBe(undefined);
  expect(() => setStringifiedCookie(cookieKey, cookieValue)).not.toThrow();
  expect(getParsedCookie(cookieKey)).toStrictEqual(cookieValue);
  expect(() => updateCookie(1)).not.toThrow();
  expect(getParsedCookie(cookieKey)).toStrictEqual(updatedCookieValue);
  expect(deleteCookie(cookieKey)).toBe(undefined);
  expect(getParsedCookie(cookieKey)).toBe(undefined);
});

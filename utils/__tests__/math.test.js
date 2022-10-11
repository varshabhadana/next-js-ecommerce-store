import { add } from '../math';

test('add to numbers together', () => {
  expect(add(1, 1)).toBe(2);
});

test('throw an error if arguments are not a numbers', () => {
  expect(() => add(1, '1')).toThrow('Pass only numbers!');
  expect(() => add('abc', 'abc')).toThrow('Pass only numbers!');
});

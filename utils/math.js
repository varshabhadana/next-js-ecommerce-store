export function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Pass only numbers!');
  }
  return a + b;
}

import { cartSum } from '../cartSum';

test('cartSum', () => {
  const cart = [
    { id: 1, count: 2 },
    { id: 2, count: 4 },
  ];
  const planters = [
    { id: 1, name: 'Purrfect Planter', material: 'Ceramic', price: 40 },
    { id: 2, name: 'Praha Planter', material: 'Ceramic', price: 100 },
    { id: 3, name: 'Amber Planter', material: 'Ceramic', price: 200 },
  ];
  expect(cartSum(cart, planters)).toBe(480);
});

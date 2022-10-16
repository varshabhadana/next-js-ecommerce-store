/* export const planters = [
  { id: 1, name: 'Purrfect Planter', material: 'Ceramic', price: 40 },
  { id: 2, name: 'Praha Planter', material: 'Ceramic', price: 100 },
  { id: 3, name: 'Amber Planter', material: 'Ceramic', price: 200 },
  { id: 4, name: 'Emerald Planter', material: 'Ceramic', price: 60 },
  { id: 5, name: 'Kavya Planter', material: 'Ceramic', price: 90 },
  { id: 6, name: 'Tezzo Planter', material: 'Clay', price: 50 },
  { id: 7, name: 'Kiki Planter', material: 'Clay', price: 50 },
  { id: 8, name: 'Saavi Planter', material: 'Clay', price: 50 },
];
 */

import { sql } from './connect';

// define types
export type Planter = {
  id: number;
  firstName: string;
  material: string;
  price: number;
  array: [];
};
// function to get data from database all the planters
export async function getPlanter() {
  const planters = await sql<Planter[]>`
SELECT * FROM planters;
`;
  return planters;
}
// function to get single planter by id from database
export async function getPlanterById(id: number) {
  // destructuring array
  const [planter] = await sql<Planter[]>`
  SELECT * FROM planters where id=${id};
  `;
  return planter;
}

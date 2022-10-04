import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();
const sql = postgres({
  // transforming snake case to camel case
  transform: {
    ...postgres.camel,
    undefined: null,
  },
});
// define types
export type Planters = {
  id: number;
  firstName: string;
  material: string;
  price: number;
  array: [];
};
// function to get data from database all the planters
export async function getPlanter() {
  const planters = await sql<Planters[]>`
SELECT * FROM planters;
`;
  return planters;
}
// function to get single planter by id from database
export async function getPlanterById(id: number) {
  // destructuring array
  const [planter] = await sql<[Planters]>`
  SELECT * FROM planters where id=${id};
  `;
  return planter;
}

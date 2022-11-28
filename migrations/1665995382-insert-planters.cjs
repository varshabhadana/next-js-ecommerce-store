const planters = [
  { first_name: 'Purrfect Planter', material: 'Ceramic', price: 40 },
  { first_name: 'Praha Planter', material: 'Ceramic', price: 100 },
  { first_name: 'Amber Planter', material: 'Ceramic', price: 200 },
  { first_name: 'Emerald Planter', material: 'Ceramic', price: 60 },
  { first_name: 'Kavya Planter', material: 'Ceramic', price: 90 },
  { first_name: 'Tezzo Planter', material: 'Clay', price: 50 },
  { first_name: 'Kiki Planter', material: 'Clay', price: 50 },
  { first_name: 'Saavi Planter', material: 'Clay', price: 50 },
];

exports.up = async (sql) => {
  await sql`INSERT INTO planters ${sql(
    planters,
    'first_name',
    'material',
    'price',
  )}
  `;
};

exports.down = async (sql) => {
  for (const planter of planters) {
  }
  await sql`
   DELETE FROM
        planters
      WHERE
        first_name = ${planter.first_name} AND
        material = ${planter.material} AND
        price = ${planter.price}




  `;
};

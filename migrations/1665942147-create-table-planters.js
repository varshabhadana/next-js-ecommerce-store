exports.up = async (sql) => {
  await sql`
    CREATE TABLE planters (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name varchar(50) NOT NULL,
    material varchar(50) NOT NULL,
    price integer NOT NULL
  );
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE planters
  `;
};

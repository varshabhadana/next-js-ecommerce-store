---Create a table
CREATE TABLE planters (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
first_name varchar(50) NOT NULL,
material varchar(50) NOT NULL,
price integer NOT NULL
  );

--Insert values
INSERT INTO planters(first_name,material,price)
VALUES
('Purrfect Planter','Ceramic',40 ),
  ( 'Praha Planter', 'Ceramic',100 ),
  ('Amber Planter','Ceramic',200 ),
  ('Emerald Planter','Ceramic',60 ),
  ( 'Kavya Planter','Ceramic',90 ),
  ('Tezzo Planter','Clay',50 ),
  ('Kiki Planter','Clay',50 ),
  ('Saavi Planter','Clay',50 );

--GET all the planters
SELECT * FROM planters;

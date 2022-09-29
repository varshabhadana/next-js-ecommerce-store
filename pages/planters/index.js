import Head from 'next/head';
import Image from 'next/image';

const planters = [
  { id: 1, name: 'Purrfect planter', material: 'Ceramic' },
  { id: 2, name: 'Praha Planter', material: 'Ceramic' },
  { id: 3, name: 'Amber Planter', material: 'Ceramic' },
  { id: 4, name: 'Emerald Planter', material: 'Ceramic' },
];

export default function Planters() {
  return (
    <>
      <Head>
        <title>Planter Product Page</title>
        <meta name="description" content="Shows all the listed planters " />
      </Head>
      <h1>Plant Pots</h1>

      {planters.map((el) => {
        return (
          <div key={el.id}>
            <h2>{el.name}</h2>
            <Image
              src={`/${el.id}-${el.name.toLowerCase()}.jpeg`}
              alt=""
              width="400"
              height="400"
            />
            <div>Material:{el.material}</div>
            <div>
              Image Name: {el.id}-{el.name.toLowerCase()}.jpeg
            </div>
          </div>
        );
      })}
    </>
  );
}

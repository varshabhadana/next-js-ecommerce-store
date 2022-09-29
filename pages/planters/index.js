import Head from 'next/head';
import Image from 'next/image';
import { planters } from '../../database/planters';

export default function Planters(props) {
  console.log(props);
  return (
    <>
      <Head>
        <title>Planter Product Page</title>
        <meta name="description" content="Shows all the listed planters " />
      </Head>
      <h1>Plant Pots</h1>

      {props.planters.map((el) => {
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
export function getServerSideProps() {
  return {
    props: {
      planters: planters,
    },
  };
}

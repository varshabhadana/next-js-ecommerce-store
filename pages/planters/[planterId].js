import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { planters } from '../../database/planters';

export default function Plannter(props) {
  if (props.error) {
    return (
      <div>
        <Head>
          <title>Product Not Found</title>
          <meta
            name="description"
            content="Product you are seraching for is not found "
          />
        </Head>
        <h1>{props.error}</h1>
        Look for other item in our store here{' '}
        <Link href="/planters">Product Page</Link>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>
          {props.planter.name}, the {props.planter.material}
        </title>
        <meta
          name="description"
          content={`${props.planter.name} is a ${props.planter.material} `}
        />
      </Head>
      <h1>{props.planter.name}</h1>
      <Image
        src={`/${props.planter.id}-${props.planter.name.toLowerCase()}.jpeg`}
        alt=""
        width="400"
        height="400"
      />
      <div>Material:{props.planter.material}</div>
      <div>
        Image Name: {props.planter.id}-{props.planter.name.toLowerCase()}.jpeg
      </div>
      <button data-test-id="product-add-to-cart">Add to cart</button>
    </div>
  );
}

export function getServerSideProps(context) {
  // Retrieve the animal ID from the URL
  const planterId = parseInt(context.query.planterId);
  // Finding the platner
  const foundPlanter = planters.find((el) => el.id === planterId);

  if (typeof foundPlanter === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Product Not Found ',
      },
    };
  }
  return {
    props: {
      planter: foundPlanter,
    },
  };
}

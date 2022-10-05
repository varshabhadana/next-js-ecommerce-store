import Head from 'next/head';
import Link from 'next/link';

export default function Cart() {
  return (
    <>
      <Head>
        <title>Cart Page</title>
        <meta
          name="description"
          content="Shows information of a item in your cart "
        />
      </Head>
      <p> Cart Page </p>
      <Link href="/checkoutpage">
        <a>
          <button>Checkout</button>
        </a>
      </Link>
    </>
  );
}

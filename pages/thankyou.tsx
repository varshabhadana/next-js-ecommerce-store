import Head from 'next/head';
import Link from 'next/link';

export default function Thankyou() {
  return (
    <>
      <Head>
        <title>Thank you for your order</title>
        <meta name="description" content="Thank you for shopping " />
      </Head>
      <h1>
        Your order is confirmed <br />
        Thank you for your order!
      </h1>
      <Link href="/planters">
        <a>
          <button>Continue Shopping</button>
        </a>
      </Link>
    </>
  );
}

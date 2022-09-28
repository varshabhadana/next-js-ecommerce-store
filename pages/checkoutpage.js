import Head from 'next/head';

export default function Checkout() {
  return (
    <>
      <Head>
        <title>Checkout Page</title>
        <meta
          name="description"
          content="Allows you to confirm order by entering shipping and payment information "
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Checkout Page
    </>
  );
}

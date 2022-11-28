import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const contentStyles = css`
  margin-top: 100px;
  text-align: center;
`;
const buttonContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 400px;
`;
const buttonStyles = css`
  padding: 10px;
  background-color: #bfd8bd;
  color: black;
  border: 2px solid #e7e7e7;
  font-size: 16px;
  margin-top: 30px;
`;
export default function Thankyou() {
  return (
    <>
      <Head>
        <title>Thank you for your order</title>
        <meta name="description" content="Thank you for shopping " />
      </Head>
      <h1 css={contentStyles}>
        Your order is confirmed <br />
        Thank you for your order!
      </h1>
      <Link href="/planters">
        <a css={buttonContainer}>
          <button css={buttonStyles}>Continue Shopping</button>
        </a>
      </Link>
    </>
  );
}

import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getPlanter } from '../database/connect';

const cartStyles = css`
  display: flex;
  margin-bottom: 20px;
  padding: 24px;
`;
const contentStyles = css`
  font-size: 15px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  column-gap: 10px;
  width: 100%;
`;
const productStyles = css`
  display: flex;
  flex-direction: row;
`;

const buttonStyles = css`
  padding: 10px;
  background-color: white;
  color: #d32f2f;
  border: 2px solid #d32f2f80;
  font-size: 15px;
  font-weight: medium;
  width: 100px;
  &:hover {
    background-color: #d32f2f80;
  }
`;
const descriptionStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 50px;
  padding: 20px;

  width: 200px;
`;
const checkoutButtonStyles = css`
  padding: 10px;
  background-color: #bfd8bd;
  color: black;
  border: 2px solid #e7e7e7;
  font-size: 16px;
  width: 500px;
`;

export default function Cart(props) {
  console.log('planter', props.planters);
  return (
    <>
      <Head>
        <title>Cart Page</title>
        <meta
          name="description"
          content="Shows information of a item in your cart "
        />
      </Head>

      {props.cart.map((el) => {
        const matchingItem = props.planters.find((item) => item.id === el.id);
        return (
          <div key={el.id} css={cartStyles}>
            <div css={contentStyles}>
              <div css={productStyles}>
                <Image
                  src={`/${
                    matchingItem.id
                  }-${matchingItem.firstName.toLowerCase()}.jpeg`}
                  alt=""
                  width="200"
                  height="200"
                />
                <div css={descriptionStyles}>
                  <div>{matchingItem.firstName}</div>
                  <div>Price : {matchingItem.price}</div>
                </div>
              </div>

              <div>
                <button style={{ marginRight: '10px' }}>-</button>

                {el.count}

                <button style={{ marginLeft: '10px' }}>+</button>
              </div>

              <div>Total : {el.count * matchingItem.price}</div>
              <button css={buttonStyles}>REMOVE</button>
            </div>
          </div>
        );
      })}

      <Link href="/checkoutpage">
        <a>
          <button css={checkoutButtonStyles}>Proceed To Checkout</button>
        </a>
      </Link>
    </>
  );
}
export async function getServerSideProps() {
  // getting data from the database
  const databasePlanters = await getPlanter();
  return {
    props: {
      planters: databasePlanters,
    },
  };
}

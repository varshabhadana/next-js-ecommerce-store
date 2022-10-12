import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getPlanter } from '../database/planters';

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
  width: 100%;
  margin: 50px;
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
      <span>AMOUNT PAYABLE :</span>

      <span data-test-id="cart-total">
        {props.cart
          .map((el) => {
            return (
              props.planters.find((item) => item.id === el.id).price * el.count
            );
          })
          .reduce((el, sum) => el + sum, 0)}
      </span>
      {props.cart.map((el) => {
        const matchingItem = props.planters.find((item) => item.id === el.id);
        return (
          <div
            data-test-id={`cart-product-${el.id}`}
            key={el.id}
            css={cartStyles}
          >
            <div css={contentStyles}>
              <div css={productStyles}>
                <Image
                  src={`/${
                    matchingItem.id
                  }-${matchingItem.firstName.toLowerCase()}.jpeg`}
                  alt={`img-${matchingItem.id}-${matchingItem.firstName}`}
                  width="200"
                  height="200"
                />
                <div css={descriptionStyles}>
                  <div>{matchingItem.firstName}</div>
                  <div>Price : {matchingItem.price}</div>
                </div>
              </div>

              <div>
                <button
                  style={{ marginRight: '10px' }}
                  onClick={() => {
                    if (el.count > 0) {
                      const deleteQuantity = props.cart.map((item) =>
                        item.id === el.id
                          ? { ...item, count: item.count - 1 }
                          : item,
                      );
                      console.log('deleteQuantity', deleteQuantity);
                      props.setCart(deleteQuantity);
                    }
                    // delete item when quantity is 0
                    if (el.count === 0) {
                      const remainingCart = props.cart.filter((item) => {
                        return item.id !== el.id;
                      });

                      // setting cart with the new cookie array
                      props.setCart(remainingCart);
                    }
                  }}
                >
                  -
                </button>

                {/*   Product quantity */}

                <div data-test-id={`cart-product-quantity-${el.id}`}>
                  {el.count}
                </div>

                <button
                  style={{ marginLeft: '10px' }}
                  onClick={() => {
                    const addQuantity = props.cart.map((item) =>
                      item.id === el.id
                        ? { ...item, count: item.count + 1 }
                        : item,
                    );
                    props.setCart(addQuantity);
                  }}
                >
                  +
                </button>
              </div>

              <div>Total : {el.count * matchingItem.price}</div>
              <button
                data-test-id={`cart-product-remove-${el.id}`}
                css={buttonStyles}
                onClick={() => {
                  // filter to get the remaining array after delete
                  const remainingCart = props.cart.filter((item) => {
                    return item.id !== el.id;
                  });

                  // setting cart with the new cookie array
                  props.setCart(remainingCart);
                }}
              >
                REMOVE
              </button>
            </div>
          </div>
        );
      })}
      <Link href="/checkoutpage">
        <a>
          <button data-test-id="cart-checkout" css={checkoutButtonStyles}>
            Proceed To Checkout
          </button>
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

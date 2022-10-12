import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getPlanterById } from '../../database/planters';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookie';

const producContainerStyles = css`
  display: flex;
  padding: 20px;
  margin: 50px 100px;
  border: 1px solid #77bfa3;
  border-radius: 8px;
`;
const productContentStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
`;
const buttonStyles = css`
  padding: 10px;
  background-color: white;
  color: black;
  border: 2px solid #e7e7e7;
  font-size: 16px;
  margin-top: 30px;
  &:hover {
    background-color: #bfd8bd;
  }
`;

export default function Plannter(props) {
  // Setting initial state of quantity as the initial quantity coming from the cookies of a particular product

  const [quantity, setQuantity] = useState(props.initialQuantity);

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
        <h2>{props.error}</h2>
        Look for other item in our store here{' '}
        <Link href="/planters">Product Page</Link>
      </div>
    );
  }
  return (
    <div>
      <Head>
        <title>
          {props.planter.firstName}, the {props.planter.material}
        </title>
        <meta
          name="description"
          content={`${props.planter.firstName} is a ${props.planter.material} `}
        />
      </Head>
      <div css={producContainerStyles}>
        <Image
          data-test-id="product-image"
          src={`/${
            props.planter.id
          }-${props.planter.firstName.toLowerCase()}.jpeg`}
          alt=""
          width="700"
          height="700"
        />
        <div css={productContentStyles}>
          <h1>{props.planter.firstName}</h1>
          <div data-test-id="product-price">{props.planter.price}</div>
          <div>Material:{props.planter.material}</div>
          <div>
            -Indoor use only
            <br />
            -Drainage hole included
            <br />
            -Wipe clean with dry cloth
          </div>

          {/* Quantity value */}
          <label htmlFor="Quantity">Quantity</label>
          <div data-test-id="product-quantity">{quantity}</div>

          <button
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          >
            +
          </button>

          <button
            onClick={() => {
              if (quantity > 0) {
                setQuantity(quantity - 1);
              }
            }}
          >
            -
          </button>

          <button
            css={buttonStyles}
            data-test-id="product-add-to-cart"
            onClick={() => {
              const currentCookieValue = getParsedCookie('cart');

              /* Changing the state of quantity  */
              props.setCart(
                props.cart.map((el) =>
                  el.id !== props.planter.id
                    ? el
                    : { id: el.id, count: quantity },
                ),
              );

              if (!currentCookieValue) {
                setStringifiedCookie('cart', [
                  { id: props.planter.id, count: 1 },
                ]);
                return;
              } else {
                /* If cookie is defined */

                const foundCookie = currentCookieValue.find(
                  (el) => el.id === props.planter.id,
                );
                /* If cookie is not defined then have set it and push it in the array*/

                if (!foundCookie) {
                  currentCookieValue.push({
                    id: props.planter.id,
                    count: 1,
                  });
                  props.setCart([
                    ...props.cart,
                    { id: props.planter.id, count: quantity },
                  ]);
                } else {
                  foundCookie.count = quantity;
                }
                setStringifiedCookie('cart', currentCookieValue);
              }
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Retrieve the planter ID or single product from the URL
  const planterId = parseInt(context.query.planterId);

  const foundPlanter = await getPlanterById(planterId);
  // Finding the platner
  /* const foundPlanter = planters.find((el) => el.id === planterId); */

  const parsedCookies = context.req.cookies.Count
    ? JSON.parse(context.req.cookies.Count)
    : [];

  const initialQuantity =
    parsedCookies.find((el) => el.id === planterId)?.count || 0;

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
      initialQuantity: initialQuantity,
    },
  };
}

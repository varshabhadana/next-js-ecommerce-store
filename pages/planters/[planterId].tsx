import { css } from '@emotion/react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getPlanterById, Planter } from '../../database/planters';
import { parseIntFromContextQuery } from '../../utils/contextQuery';
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
const inputStyles = css`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export type CartData = {
  id: number;
  count: number;
};
type Props =
  | {
      planter: Planter;
      initialQuantity: number;
      cart: CartData[];
      setCart: any;
    }
  | {
      error: string;
    };

export default function Plannter(props: Props) {
  // Setting initial state of quantity as the initial quantity coming from the cookies of a particular product

  if ('error' in props) {
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [quantity, setQuantity] = useState(props.initialQuantity);

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
          alt={`img-${props.planter.id}-${props.planter.firstName}`}
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
          <div css={inputStyles}>
            <input
              data-test-id="product-quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(event) => setQuantity(event.target.valueAsNumber)}
            />
          </div>

          <button
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          >
            +
          </button>

          <button
            onClick={() => {
              if (quantity > 1) {
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
              if (props.cart.length <= 0) {
                props.setCart([{ id: props.planter.id, count: quantity }]);
                return;
              } else {
                /* If cookie is defined */

                const foundCookie = props.cart.find(
                  (el: CartData) => el.id === props.planter.id,
                );
                /* If cookie is not defined then have set it and push it in the array*/
                if (!foundCookie) {
                  props.setCart([
                    ...props.cart,
                    { id: props.planter.id, count: quantity },
                  ]);
                } else {
                  console.log('here...');
                  console.log(quantity);
                  props.setCart(
                    props.cart.map((el) =>
                      el.id === foundCookie.id
                        ? { id: el.id, count: foundCookie.count + quantity }
                        : el,
                    ),
                  );
                }
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

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<
  GetServerSidePropsResult<
    | { planter: Planter; initialQuantity: number }
    | {
        error: string;
      }
  >
> {
  // Retrieve the planter ID or single product from the URL
  const planterId = parseIntFromContextQuery(context.query.planterId);

  if (typeof planterId === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Product Not Found ',
      },
    };
  }

  const foundPlanter = await getPlanterById(planterId);
  // Finding the platner
  /* const foundPlanter = planters.find((el) => el.id === planterId); */

  const parsedCookies = context.req.cookies.Count
    ? JSON.parse(context.req.cookies.Count)
    : [];

  const initialQuantity =
    parsedCookies.find((el: CartData) => el.id === planterId)?.count || 1;

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

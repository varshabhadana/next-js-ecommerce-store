import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { planters } from '../../database/planters';
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
      <div css={producContainerStyles}>
        <Image
          src={`/${props.planter.id}-${props.planter.name.toLowerCase()}.jpeg`}
          alt=""
          width="700"
          height="700"
        />
        <div css={productContentStyles}>
          <h1>{props.planter.name}</h1>
          <div>Material:{props.planter.material}</div>
          <div>
            -Indoor use only
            <br />
            -Drainage hole included
            <br />
            -Wipe clean with dry cloth
          </div>
          <label htmlFor="Quantity">Quantity</label>

          <button
            onClick={() => {
              const currentCookieValue = getParsedCookie('Count');

              if (!currentCookieValue) {
                setStringifiedCookie('Count', [
                  { id: props.planter.id, count: 1 },
                ]);
                return;
              } else {
                /* If cookie is defined */

                const foundCookie = currentCookieValue.find(
                  (el) => el.id === props.planter.id,
                );

                if (!foundCookie) {
                  currentCookieValue.push({ id: props.planter.id, count: 1 });
                } else {
                  foundCookie.count++;
                }
                setStringifiedCookie('Count', currentCookieValue);
              }
            }}
          >
            +
          </button>

          <button
            onClick={() => {
              const currentCookieValue = getParsedCookie('Count');
              if (!currentCookieValue) {
                setStringifiedCookie('Count', [
                  { id: props.planter.id, count: 0 },
                ]);
              } else {
                const foundCookie = currentCookieValue.find(
                  (el) => el.id === props.planter.id,
                );
                if (!foundCookie) {
                  currentCookieValue.push({ id: props.planter.id, count: 0 });
                } else {
                  if (foundCookie.count > 0) {
                    foundCookie.count--;
                  }
                }
                setStringifiedCookie('Count', currentCookieValue);
              }
            }}
          >
            -
          </button>
          <button css={buttonStyles} data-test-id="product-add-to-cart">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export function getServerSideProps(context) {
  // Retrieve the planter ID or single product from the URL
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

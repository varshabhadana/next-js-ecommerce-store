import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getPlanter, Planter } from '../../database/planters';

const productContainerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px;
  margin: 10px;
  column-gap: 40px;
  row-gap: 50px;
  a {
    color: black;

    text-decoration: none;
  }
`;
const productStyles = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 24px;
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 8px #bfd8bd;
    background-color: 'red';
  }
`;
const contentStyles = css`
  font-size: 15px;
  margin-bottom: 5px;
`;

const buttonStyles = css`
  padding: 10px;
  background-color: white;
  color: black;
  border: 2px solid #e7e7e7;
  font-size: 16px;
  width: 100%;
  &:hover {
    background-color: #bfd8bd;
  }
`;
type Props = {
  planters: Planter[];
};

export default function Planters(props: Props) {
  return (
    <>
      <Head>
        <title>Planter Product Page</title>
        <meta name="description" content="Shows all the listed planters " />
      </Head>

      <div css={productContainerStyles}>
        {props.planters.map((el) => {
          return (
            <div key={`product-${el.id}`} css={productStyles}>
              <Link href={`/planters/${el.id}`}>
                <a data-test-id={`product-${el.id}`}>
                  <Image
                    src={`/${el.id}-${el.firstName.toLowerCase()}.jpeg`}
                    alt={`Planter-${el.firstName}`}
                    width="400"
                    height="400"
                  />

                  {/* Mapping over array to get product name */}

                  <span>
                    <h2>{el.firstName}</h2>
                  </span>

                  {/* Mapping over array to get product description */}
                  <div css={contentStyles}>Material : {el.material}</div>

                  {/* Mapping over array to get product price */}
                  <div css={contentStyles}>Price : {el.price}</div>

                  <span data-test-id="product-price">
                    <button css={buttonStyles}>View Product</button>
                  </span>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
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

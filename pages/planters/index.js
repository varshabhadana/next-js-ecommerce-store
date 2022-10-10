import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getPlanter } from '../../database/planters';

const productContainerStyles = css`
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  padding: 20px;
  margin: 10px;
  column-gap: 20px;
  row-gap: 20px;
`;
const productStyles = css`
  display: flex;

  justify-content: center;
  flex-direction: column;
  padding: 24px;
  box-shadow: 0 0px 0px 0 gray;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 8px 16px 0 #bfd8bd;
  }
`;
const contentStyles = css`
  font-size: 15px;
  margin-bottom: 5px;
`;
const headingStyles = css`
  font-size: 40px;

  padding: 10px;
  margin: 20px;
  text-align: left;
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

export default function Planters(props) {
  console.log(props);
  return (
    <>
      <Head>
        <title>Planter Product Page</title>
        <meta name="description" content="Shows all the listed planters " />
      </Head>
      <h1 css={headingStyles}>Plant Pots</h1>
      <div css={productContainerStyles}>
        {props.planters.map((el) => {
          return (
            <div key={el.id} css={productStyles}>
              {/* Mapping over array to get Images */}
              <Link
                data-test-id={`product-${el.id}`}
                href={`/planters/${el.id}`}
              >
                <a>
                  <Image
                    src={`/${el.id}-${el.firstName.toLowerCase()}.jpeg`}
                    alt=""
                    width="300"
                    height="300"
                  />
                </a>
              </Link>
              {/* Mapping over array to get product name */}
              <Link
                data-test-id={`product-${el.id}`}
                href={`/planters/${el.id}`}
              >
                <a>
                  <h2>{el.firstName}</h2>
                </a>
              </Link>
              {/* Mapping over array to get product description */}
              <div css={contentStyles}>Material : {el.material}</div>

              {/* Mapping over array to get product price */}
              <div css={contentStyles} data-test-id="product-price">
                Price : {el.price}
              </div>
              <Link href={`/planters/${el.id}`}>
                <a>
                  <button css={buttonStyles}>View Product</button>
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

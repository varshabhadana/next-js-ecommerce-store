import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getPlanter, Planter } from '../database/planters';

const headingStyles = css`
  text-align: center;
  font-size: 32px;
  padding: 20px;
  color: #964b00;
`;
const mainContainer = css`
  background-color: white;
`;

const productContainerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
  padding: 20px;
  margin-bottom: 20px;
  a {
    color: black;

    text-decoration: none;
  }
`;
const backgroundImageStyles = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: 2;
  background-color: grey;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.3),
      rgba(218, 188, 188, 0.3)
    ),
    url(heroimage.jpg);
  background-size: cover;
  background-position: 25% 25%;
  min-height: 100vh;
`;
const mainContentStyles = css`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  padding: 100px;
  margin-top: 50px;
  h1 {
    font-size: 80px;
    color: white;
  }
  a {
    font-size: 22px;
    color: black;
    padding: 16px;
    background-color: #bfd8bd;
    text-decoration: none;
    border-radius: 4px;
    &:hover {
      background-color: #ffff;
    }
  }
`;
type Props = {
  planters: Planter[];
};

export default function Home(props: Props) {
  return (
    <div css={mainContainer}>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Introduction to the website " />
      </Head>
      <div css={backgroundImageStyles}>
        <div css={mainContentStyles}>
          <h1>Luna Studio</h1>
          <Link href="/planters">
            <a>Shop Collection</a>
          </Link>
        </div>
      </div>
      <h3 css={headingStyles}>- HANDMADE WITH LOVE -</h3>
      <div css={productContainerStyles}>
        {props.planters.slice(0, 3).map((el) => {
          return (
            <Link key={`product-${el.id}`} href={`/planters/${el.id}`}>
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

                {/* Mapping over array to get product price */}
                <div>Price : {el.price}</div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
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

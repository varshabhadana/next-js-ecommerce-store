import { css, Global } from '@emotion/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { CookieBanner } from '../components/CookieBanner';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const parsedCookies = Cookies.get('Count')
      ? JSON.parse(Cookies.get('Count'))
      : [];
    setCart(parsedCookies);
  }, []);

  return (
    <>
      <Global
        styles={css`
          *,
          *::before,
          *::after {
            box-sizing: border-box;
          }
          body {
            font-family: 'Nanum Myeongjo', serif;
            margin: 0;
            padding: 0;
          }
        `}
      />
      <CookieBanner />
      <Layout cart={cart} setCart={setCart}>
        <Component {...pageProps} cart={cart} setCart={setCart} />
      </Layout>
    </>
  );
}

export default MyApp;

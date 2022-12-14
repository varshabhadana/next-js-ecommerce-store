import { css, Global } from '@emotion/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { CookieBanner } from '../components/CookieBanner';
import Layout from '../components/Layout';
import { setStringifiedCookie } from '../utils/cookie';

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const parsedCookies = Cookies.get('cart')
      ? JSON.parse(Cookies.get('cart'))
      : [];
    setCart(parsedCookies);
  }, []);
  useEffect(() => {
    setStringifiedCookie('cart', cart);
  }, [cart]);

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
            @font-face {
              font-family: 'Patrick Hand SC';
              font-style: normal;
              font-weight: 400;
              src: local('Patrick Hand SC'), local('PatrickHandSC-Regular'),
                url(https://fonts.gstatic.com/s/patrickhandsc/v4/OYFWCgfCR-7uHIovjUZXsZ71Uis0Qeb9Gqo8IZV7ckE.woff2)
                  format('woff2');
              unicode-range: U+0100-024f, U+1-1eff, U+20a0-20ab, U+20ad-20cf,
                U+2c60-2c7f, U+A720-A7FF;
            }
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

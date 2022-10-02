import { css, Global } from '@emotion/react';
import { CookieBanner } from '../components/CookieBanner';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;

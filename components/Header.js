import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 4px 2px -2px #dde7c7;
  font-weight: bold;

  margin: 20px 0px;
  padding: 10px;
  font-size: 30px;
  a {
    color: #77bfa3;
    text-decoration: none;
  }
`;
const navLeftStyles = css`
  margin-left: 20px;

  > a + a {
    margin-left: 50px;
  }
`;
const cartStyles = css`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
`;

export default function Header(props) {
  return (
    <header>
      <nav css={navStyles}>
        <div css={navLeftStyles}>
          <Link href="/">Home</Link>
          <Link href="/planters">
            <a data-test-id="products-link">Products</a>
          </Link>
        </div>
        <div css={cartStyles}>
          <Link href="/cartpage">
            <a data-test-id="cart-link">Cart</a>
          </Link>

          <span data-test-id="cart-count">
            {props.cart.reduce((acc, el) => el.count + acc, 0)}
          </span>
        </div>
      </nav>
    </header>
  );
}

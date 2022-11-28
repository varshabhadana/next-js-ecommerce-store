import { css } from '@emotion/react';

const footerStyles = css`
  text-align: center;
  border: 1px solid transparent;
`;

export default function Footer() {
  return <footer css={footerStyles}>copyright@LunaStudio</footer>;
}

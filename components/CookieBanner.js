import { css } from '@emotion/react';
import { useState } from 'react';

const bannerStyles = (isOpen) => css`
  padding: 5px;
  height: 20px;
  transition: all 0.5s ease-in-out;

  ${!isOpen &&
  css`
    height: 0;
    padding: 0;
    overflow: hidden;
  `}
`;

export function CookieBanner() {
  const [isBannerOpen, setIsBannerOpen] = useState(true);
  return (
    <div css={bannerStyles(isBannerOpen)}>
      <span>Please accept our cookie ploicy</span>{' '}
      {JSON.stringify(isBannerOpen)}
      <button
        onClick={() => {
          setIsBannerOpen(false);
        }}
      >
        Yes
      </button>
    </div>
  );
}

import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

const bannerStyles = (isOpen: boolean) => css`
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
  const [isBannerOpen, setIsBannerOpen] = useState<boolean>(true);
  // To render cookie banner
  useEffect(() => {
    const initialValue = getLocalStorage('isBannerOpen');

    if (initialValue !== null) {
      setIsBannerOpen(initialValue);
    }
  }, []);

  return (
    <div css={bannerStyles(isBannerOpen)}>
      <span>Please accept our cookie ploicy</span>
      <button
        onClick={() => {
          setIsBannerOpen(false);
          setLocalStorage('isBannerOpen', false);
        }}
      >
        Yes
      </button>
    </div>
  );
}

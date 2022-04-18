import { SetStateAction } from 'react';

export const windowWidth = (setCurrentWidth: SetStateAction<any>) => {
  function resizeListener() {
    setCurrentWidth(window.innerWidth);
  }

  window.addEventListener('resize', resizeListener);
};

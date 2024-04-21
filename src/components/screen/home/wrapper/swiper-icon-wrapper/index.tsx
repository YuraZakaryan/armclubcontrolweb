import React from 'react';
import { ISwiperIconWrapper } from '@components/screen/home/types';

export const SwiperIconWrapper: React.FC<ISwiperIconWrapper> = React.memo(({ children, handleClick, disabled }) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="relative flex items-center justify-center rounded-lg bg-slate-300/20 p-2"
    >
      {children}
    </button>
  );
});
SwiperIconWrapper.displayName = 'SwiperIconWrapper';

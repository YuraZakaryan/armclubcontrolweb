import PSImage from '@assets/icons/ps.png';
import { IMissingCards } from '@types';
import { Image } from 'primereact/image';
import React from 'react';

export const MissingCards: React.FC<IMissingCards> = React.memo(({ message }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <Image src={PSImage} alt={message} width="250px" height="250px" />
      <h1 className="text-center text-3xl text-text-nav underline tablet-max:text-xl mobile-max:text-base">
        {message}
      </h1>
    </div>
  );
});
MissingCards.displayName = 'MissingCards';

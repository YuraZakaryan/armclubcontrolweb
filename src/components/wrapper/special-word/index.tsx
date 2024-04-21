import React, { PropsWithChildren } from 'react';

export const SpecialWord: React.FC<PropsWithChildren> = React.memo(({ children }) => {
  return <span className={'ml-1 font-bold text-black underline'}>{children}</span>;
});
SpecialWord.displayName = 'SpecialWord';

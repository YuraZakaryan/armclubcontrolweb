import React, { PropsWithChildren } from 'react';

export const Main: React.FC<PropsWithChildren> = React.memo(({ children }) => {
  return <main className="h-full w-full py-2 text-text">{children}</main>;
});
Main.displayName = 'Main';

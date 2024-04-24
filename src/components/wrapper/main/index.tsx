import React, { PropsWithChildren } from 'react';
import { TClassName } from '@types';
import cn from 'classnames';

export const Main: React.FC<PropsWithChildren<TClassName>> = React.memo(({ children, className }) => {
  return <main className={cn('h-full w-full py-2 text-text', className)}>{children}</main>;
});
Main.displayName = 'Main';

import { TClassName } from '@types';
import cn from 'classnames';
import React, { PropsWithChildren } from 'react';

export const Preloader: React.FC<PropsWithChildren<TClassName>> = React.memo((props) => {
  const { children, className } = props;
  return (
    <div role="status" className={cn('flex max-w-lg animate-pulse', className)}>
      {children}
    </div>
  );
});
Preloader.displayName = 'Preloader';

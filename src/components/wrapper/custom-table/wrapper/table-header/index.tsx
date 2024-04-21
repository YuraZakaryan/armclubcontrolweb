import { TClassName } from '@types';
import cn from 'classnames';
import React, { PropsWithChildren } from 'react';

export const CustomTableHeaderItem: React.FC<PropsWithChildren<TClassName>> = React.memo(({ children, className }) => {
  return (
    <th scope="col" className={cn('px-6 py-3 text-center', className)}>
      {children}
    </th>
  );
});
CustomTableHeaderItem.displayName = 'CustomTableHeaderItem';

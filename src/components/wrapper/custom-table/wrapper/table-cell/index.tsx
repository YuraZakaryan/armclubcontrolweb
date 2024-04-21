import { TClassName } from '@types';
import cn from 'classnames';
import React, { PropsWithChildren } from 'react';

export const CustomTableCell: React.FC<PropsWithChildren<TClassName>> = React.memo(({ children, className }) => {
  return <td className={cn('px-6 py-4 text-center text-black dark:text-dark-text', className)}>{children}</td>;
});
CustomTableCell.displayName = 'CustomTableCell';

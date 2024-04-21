import { TClassName } from '@types';
import cn from 'classnames';
import React from 'react';

export const Asterisk: React.FC<TClassName> = React.memo(({ className }) => {
  return <span className={cn('text-sm text-red-800', className)}>*</span>;
});
Asterisk.displayName = 'Asterisk';

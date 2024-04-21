import { TClassName } from '@types';
import cn from 'classnames';
import React from 'react';

export const Loader: React.FC<TClassName> = ({ className }) => {
  return (
    <div className={cn('flex h-full w-full items-center justify-center', className)}>
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-slate-400 border-t-transparent"></div>
    </div>
  );
};

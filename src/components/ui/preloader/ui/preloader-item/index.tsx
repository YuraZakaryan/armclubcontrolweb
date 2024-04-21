import { TClassName } from '@types';
import cn from 'classnames';
import React from 'react';

export const PreloaderItem: React.FC<TClassName> = React.memo(({ className }) => {
  return <div className={cn('h-6 w-full rounded border-none bg-gray-100 dark:bg-gray-700', className)} />;
});

import { DialogContent } from '@components/shadcn/ui/dialog';
import { TClassName } from '@types';
import cn from 'classnames';
import React, { PropsWithChildren } from 'react';

export const DialogContentCorrect: React.FC<PropsWithChildren<TClassName>> = React.memo((props) => {
  const { children, className } = props;
  return (
    <DialogContent className={cn('overflow-y-auto bg-inherit laptop-hd-min:ml-[180px]', className)}>
      {children}
    </DialogContent>
  );
});
DialogContentCorrect.displayName = 'DialogContentCorrect';

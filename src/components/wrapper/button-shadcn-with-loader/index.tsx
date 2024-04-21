import { Button } from '@components/shadcn/ui/button';
import { ButtonLoading } from '@components/ui';
import { IButtonWithLoader } from '@types';
import cn from 'classnames';
import React from 'react';

export const ButtonShadcnWithLoader: React.FC<IButtonWithLoader> = React.memo((props) => {
  const { text, handleClick, isLoading, disabled, type, className } = props;

  return (
    <Button
      type={type ? type : 'button'}
      variant="outline"
      disabled={disabled || isLoading}
      onClick={handleClick}
      className={cn('font-bold', className)}
    >
      {isLoading ? <ButtonLoading color="gray" /> : text}
    </Button>
  );
});
ButtonShadcnWithLoader.displayName = 'ButtonShadcnWithLoader';

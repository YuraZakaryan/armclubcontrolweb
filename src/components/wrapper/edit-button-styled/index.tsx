import React from 'react';
import { IEditButtonStyled } from '@types';
import cn from 'classnames'
import { ButtonLoading } from '@components/ui';

export const EditButtonStyled: React.FC<IEditButtonStyled> = React.memo(
  ({
    icon: Icon,
    handleClick,
    className,
    disabled,
    isLoading,
    text,
    iconColor,
    loaderIconColor,
    iconSize,
  }) => {
    return (
      <button
        disabled={disabled}
        className={cn(
          'rounded-lg px-4 py-2 transition-all',
          className,
          !disabled && 'hover:bg-button_bg/20'
        )}
        onClick={handleClick}
      >
        {isLoading ? (
          <ButtonLoading color={loaderIconColor || 'gray'} />
        ) : text ? (
          text
        ) : (
          <Icon size={iconSize || 20} color={iconColor ? iconColor : 'gray'} />
        )}
      </button>
    );
  }
);
EditButtonStyled.displayName = 'EditButtonStyled';

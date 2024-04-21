import { Input } from '@components/shadcn/ui/input';
import { Label } from '@components/shadcn/ui/label';
import { Asterisk } from '@components/ui';
import { IInputWithLabel } from '@types';
import cn from 'classnames';
import React from 'react';

export const InputWithLabel: React.FC<IInputWithLabel> = React.memo((props) => {
  const {
    name,
    label,
    type,
    placeholder,
    className,
    disabled,
    require,
    value,
    handleChange,
    children,
    innerClassName,
    min,
  } = props;

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <Label className="font-bold tablet-max:text-[12px]">
        {require ? <Asterisk className={'mr-1'} /> : null}
        {label}
      </Label>
      <div className={cn('', innerClassName)}>
        {children ? (
          children
        ) : (
          <Input
            type={type || 'text'}
            placeholder={placeholder}
            name={name}
            value={value}
            disabled={disabled}
            min={min}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>): void => {
              if (event.key === '-') {
                event.preventDefault();
              }
            }}
            onChange={handleChange}
            className="bg-[#eff4fb] text-black"
            accept={type === 'file' ? 'image/*' : undefined}
          />
        )}
      </div>
    </div>
  );
});
InputWithLabel.displayName = 'InputWithLabel';

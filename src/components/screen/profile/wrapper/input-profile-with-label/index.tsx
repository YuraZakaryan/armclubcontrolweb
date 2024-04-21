import { IInputProfileWithLabel } from '@components/screen/profile/types';
import { Input } from '@components/shadcn/ui/input';
import { Label } from '@components/shadcn/ui/label';
import { Asterisk } from '@components/ui';
import cn from 'classnames';
import { useField } from 'formik';
import React from 'react';

export const InputProfileWithLabel: React.FC<IInputProfileWithLabel> = React.memo((props) => {
  const { name, label, type, placeholder, className, disabled, require } = props;
  const [field] = useField(name);

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <Label className="font-bold tablet-max:text-[12px]">
        {require ? <Asterisk className={'mr-1'} /> : null}
        {label}
      </Label>
      <Input
        {...field}
        type={type || 'text'}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        className="bg-[#eff4fb] text-black"
        accept={type === 'file' ? 'image/*' : undefined}
      />
    </div>
  );
});
InputProfileWithLabel.displayName = 'InputProfileWithLabel';

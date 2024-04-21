import { Label } from '@components/shadcn/ui/label';
import { IInputMaskWithLabel } from '@types';
import cn from 'classnames';
import { useField } from 'formik';
import { InputMask } from 'primereact/inputmask';
import React from 'react';

export const InputMaskWithLabel: React.FC<IInputMaskWithLabel> = React.memo((props) => {
  const { name, label, placeholder, mask, className } = props;
  const [field] = useField(name);

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <Label className="font-bold tablet-max:text-[12px]">{label}</Label>
      <InputMask
        {...field}
        id={name}
        mask={mask || ''}
        placeholder={placeholder || ''}
        className={'h-10 w-full border border-gray-200 bg-[#eff4fb] px-2 text-black'}
      />
    </div>
  );
});
InputMaskWithLabel.displayName = 'InputMaskWithLabel';

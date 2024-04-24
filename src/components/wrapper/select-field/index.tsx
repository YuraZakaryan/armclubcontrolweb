import { Label } from '@components/shadcn/ui/label';
import { Asterisk } from '@components/ui';
import { ISelectField, TSelectOption } from '@types';
import cn from 'classnames';
import { useField } from 'formik';
import React from 'react';
import Select from 'react-select';

export const SelectFormikField: React.FC<ISelectField> = React.memo((props) => {
  const { options, name, label, className, require, setFieldValue } = props;
  const [field] = useField(name);

  console.log(field);
  const [selectedOption, setSelectedOption] = React.useState<TSelectOption | null | undefined>(
    field.value ? options.find((option): boolean => option.value === field.value) : undefined,
  );

  React.useEffect(() => {
    setSelectedOption(field.value ? options.find((option) => option.value === field.value) : undefined);
  }, [field.value, options]);

  const emptyOption: TSelectOption = { label: 'Ընտրել․․․', value: '' };

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <Label className="font-bold tablet-max:text-[12px]">
        {require ? <Asterisk className={'mr-1'} /> : null}
        {label}
      </Label>
      <Select
        {...field}
        id={name}
        options={[emptyOption, ...options]}
        value={selectedOption || null}
        onChange={async (option: TSelectOption | null): Promise<void> => {
          if (option) {
            setSelectedOption(option);
            await setFieldValue(name, option.value);
          }
        }}
        styles={{
          control: (provided) => ({
            ...provided,
            border: '1px solid #e2e8f0',
            borderRadius: '0.375rem',
            padding: '2px',
            backgroundColor: '#eff4fb',
            fontSize: '14px',
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#4299e1' : 'white',
            borderRadius: '2px',
            color: state.isSelected ? 'white' : 'black',
            fontSize: '14px',
            transition: 'background-color 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: '#4299e1',
              color: 'white',
            },
          }),
        }}
        theme={(base) => ({
          ...base,
          colors: {
            ...base.colors,
            primary: '#4299e1',
            primary25: '#a0aec0',
          },
        })}
        placeholder={'Ընտրել․․․'}
      />
    </div>
  );
});
SelectFormikField.displayName = 'SelectFormikField';

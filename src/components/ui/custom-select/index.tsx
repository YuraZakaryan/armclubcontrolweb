import { ICustomSelect, TSelectOption } from '@types';
import React from 'react';
import Select from 'react-select';

export const CustomSelect: React.FC<ICustomSelect> = React.memo((props) => {
  const { options, name, label, value, onChange } = props;

  const handleChange = (selectedOption: TSelectOption | null): void => {
    if (selectedOption) {
      onChange(selectedOption.value);
    }
  };

  const emptyOption: TSelectOption = { label: 'Ընտրել․․․', value: '' };

  return (
    <div className="flex flex-col gap-1">
      {label ? <label className="text-sm font-semibold text-gray-500 underline">{label}</label> : null}
      <Select
        id={name}
        options={[emptyOption, ...options]}
        value={options.find((option: TSelectOption): boolean => option.value === value) || null}
        onChange={handleChange}
        styles={{
          control: (provided) => ({
            ...provided,
            border: '1px solid #e2e8f0',
            borderRadius: '0.375rem',
            padding: '2px',
            backgroundColor: '#eff4fb',
            fontSize: '14px',
            minWidth: '200px',
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
          menu: (provided) => ({ ...provided, zIndex: 30 }),
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
CustomSelect.displayName = 'CustomSelect';

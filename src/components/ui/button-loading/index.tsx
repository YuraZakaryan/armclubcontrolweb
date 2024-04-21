import { IButtonLoading } from '@types';
import React from 'react';
import ReactLoading from 'react-loading';

export const ButtonLoading: React.FC<IButtonLoading> = React.memo(({ color }) => {
  return <ReactLoading width={20} color={color} height={20} type={'spin'} />;
});
ButtonLoading.displayName = 'ButtonLoading';

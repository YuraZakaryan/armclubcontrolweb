import { ICustomLoader } from '@types';
import cn from 'classnames';
import React from 'react';
import ReactLoading from 'react-loading';

export const CustomLoader: React.FC<ICustomLoader> = (props) => {
  const { type = 'balls', color = 'silver', height, width, className } = props;

  return (
    <div>
      <ReactLoading className={cn('', className)} type={type} color={color} height={height} width={width} />
    </div>
  );
};

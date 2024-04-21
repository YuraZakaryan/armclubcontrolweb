import React from 'react';
import cn from 'classnames'
import type { ICustomTableRow } from '@components/wrapper/custom-table/types'

export const CustomTableRow: React.FC<ICustomTableRow> = React.memo((props) => {
  const { children, className, handleClick } = props;

  return (
    <tr
      className={cn(
        'bg-white bg-opacity-60 backdrop-blur-md transition-all hover:bg-gray-100/90 hover:bg-opacity-100 dark:bg-dark-table-row dark:hover:bg-dark-table-row/50',
        className
      )}
      onClick={handleClick}
    >
      {children}
    </tr>
  );
});
CustomTableRow.displayName = 'CustomTableRow';

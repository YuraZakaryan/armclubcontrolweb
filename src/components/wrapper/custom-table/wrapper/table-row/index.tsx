import type { ICustomTableRow } from '@components/wrapper/custom-table/types';
import cn from 'classnames';
import React from 'react';
import ReactLoading from 'react-loading';

export const CustomTableRow: React.FC<ICustomTableRow> = React.memo((props) => {
  const { children, className, handleClick, isLoading } = props;

  return (
    <tr
      className={cn(
        'relative bg-white bg-opacity-60 backdrop-blur-md transition-all hover:bg-gray-100/90 hover:bg-opacity-100 dark:bg-dark-table-row dark:hover:bg-dark-table-row/50',
        className,
      )}
      onClick={handleClick}
    >
      {children}
      {isLoading && (
        <td className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 dark:bg-dark-table-row/60">
          <ReactLoading type="cylon" color="black" height={40} width={40} />
        </td>
      )}
    </tr>
  );
});
CustomTableRow.displayName = 'CustomTableRow';

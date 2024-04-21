import { ICustomTable } from '@types';
import React from 'react';

export const CustomTable: React.FC<ICustomTable> = React.memo((props) => {
  const { header, body, caption } = props;

  const lengthHeader: number = React.isValidElement(header) ? React.Children.count(header.props.children) : 0;

  return (
    <div className="relative mt-4 overflow-x-auto">
      <table className="w-full overflow-hidden rounded-lg bg-gray-50 text-left text-sm dark:text-gray-400 rtl:text-right">
        <thead className="bg-gray-200 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>{header}</tr>
        </thead>
        <tbody>
          {caption ? (
            <tr>
              <td colSpan={lengthHeader} className="text-center text-xl leading-[60px] text-text-nav">
                {caption}
              </td>
            </tr>
          ) : null}
          {body}
        </tbody>
      </table>
    </div>
  );
});
CustomTable.displayName = 'CustomTable';

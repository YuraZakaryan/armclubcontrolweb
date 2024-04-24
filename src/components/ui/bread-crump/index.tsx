import { TBreadcrumb } from '@types';
import cn from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

export const Breadcrumb: React.FC<TBreadcrumb> = React.memo((props) => {
  const { className, pageName } = props;

  return (
    <div className={cn('flex justify-end', className)}>
      <nav>
        <ul className="flex items-center gap-2 text-text tablet-max:text-xs">
          <li>
            <Link to="/">Գլխավոր &nbsp;/</Link>
          </li>
          <li className="cursor-default text-text_hover_focus">{pageName}</li>
        </ul>
      </nav>
    </div>
  );
});
Breadcrumb.displayName = 'Breadcrumb';

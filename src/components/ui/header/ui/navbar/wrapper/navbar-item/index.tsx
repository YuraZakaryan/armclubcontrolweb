import { IHeaderBarItem } from '@components/ui/header/types';
import cn from 'classnames';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const HeaderBarItem: React.FC<IHeaderBarItem> = React.memo((props) => {
  const { title, url, cypressId } = props;
  const { pathname } = useLocation();

  return (
    <li
      className={cn(
        'relative mr-8 cursor-pointer border-none pb-2 transition-all hover:text-text_hover_focus hover:after:absolute hover:after:bottom-0 hover:after:h-[3px] hover:after:w-full hover:after:rounded hover:after:bg-text_hover_focus laptop-hd-max:text-base',
        pathname === url &&
          'text-text_special after:absolute after:bottom-0 after:h-[3px] after:w-full after:rounded after:bg-text_special hover:opacity-90',
      )}
    >
      <Link to={url}>
        <h3 data-cy={`header-${cypressId}`}>{title}</h3>
      </Link>
    </li>
  );
});
HeaderBarItem.displayName = 'HeaderBarItem';

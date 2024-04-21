import type { ISideBarItem } from '@components/ui/sidebar/types';
import cn from 'classnames';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { ButtonOrLink } from '../buttonOrLink';

export const SideBarItem: React.FC<ISideBarItem> = React.memo((props) => {
  const { href, className } = props;
  const { pathname } = useLocation();

  return (
    <li
      className={cn(
        'relative flex h-10 w-full cursor-pointer items-center transition-all after:absolute after:right-0 after:h-full after:w-[4px] hover:text-text_hover_focus after:hover:bg-button_bg',
        className,
        pathname === href &&
          'text-text_hover_focus after:absolute after:right-0 after:h-full after:w-[4px] after:bg-button_bg',
      )}
    >
      <ButtonOrLink {...props} />
    </li>
  );
});
SideBarItem.displayName = 'SideBarItem';

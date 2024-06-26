import { ISidebarDropdown } from '@components/ui/sidebar/types';
import cn from 'classnames';
import React from 'react';
import { IoChevronDownSharp } from 'react-icons/io5';

export const SidebarDropdown: React.FC<ISidebarDropdown> = React.memo((props) => {
  const { title, iconClassName, state, handleClick, children, className } = props;

  return (
    <div className={cn('ml-1', className)}>
      <button
        className="relative flex h-10 w-full cursor-pointer items-center gap-2 text-sm transition-all"
        onClick={handleClick}
      >
        <IoChevronDownSharp className={cn('transition-all', iconClassName)} width={18} height={18} />
        <p className="text-text-nav">{title}</p>
      </button>
      <ul className={cn('ml-7', !state && 'hidden')}>{children}</ul>
    </div>
  );
});
SidebarDropdown.displayName = 'SidebarDropdown';

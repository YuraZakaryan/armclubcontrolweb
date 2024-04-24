import type { ISideBarMenu, TMenuElement } from '@components/ui/sidebar/types';
import { SideBarItem, SideBarList } from '@components/ui/sidebar/wrapper';
import { useAppDispatch } from '@hooks/redux';
import { logOut } from '@redux/reducers';
import cn from 'classnames';
import React from 'react';

export const SideBarMenu: React.FC<ISideBarMenu> = React.memo((props) => {
  const { list, activated, iconSize, className, sidebarItemClassName, showLabel, label } = props;

  const dispatch = useAppDispatch();

  const handleClick = (): void => {
    dispatch(logOut());
  };

  return (
    <section className={cn('text-sm', className && className)}>
      <SideBarList>
        {showLabel ? <label className="text-gray-500">{label}</label> : null}
        {list.map((item: TMenuElement, index: number) => (
          <React.Fragment key={index}>
            {item.title === 'Իմ էջը' && !activated ? (
              <SideBarItem
                icon={item.icon}
                secondaryIcon={item.secondaryIcon}
                title={item.title}
                href={item.href}
                className={sidebarItemClassName}
                cy="profile"
              />
            ) : (
              <SideBarItem
                icon={item.icon}
                title={item.title}
                iconSize={iconSize || 18}
                href={item.href}
                handleClick={handleClick}
              />
            )}
          </React.Fragment>
        ))}
      </SideBarList>
    </section>
  );
});
SideBarMenu.displayName = 'SideBarMenu';

import type { ISideBarMenu } from '@components/ui/sidebar/types';
import { SideBarItem, SideBarList } from '@components/ui/sidebar/wrapper';
import { useAppDispatch } from '@hooks/redux';
import { logOut } from '@redux/reducers';
import cn from 'classnames';
import React from 'react';

export const SideBarMenu: React.FC<ISideBarMenu> = React.memo((props) => {
  const { list, activated, iconSize, className, sidebarItemClassName } = props;

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(logOut());
  };

  return (
    <section className={cn('', className && className)}>
      <SideBarList>
        {list.map((item, index) => (
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
                iconSize={iconSize}
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

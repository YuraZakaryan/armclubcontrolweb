import React from 'react';
import { Link } from 'react-router-dom';
import { ISideBarItem } from '../../types';

export const ButtonOrLink: React.FC<ISideBarItem> = ({
  href,
  secondaryIcon: SecondaryIcon,
  icon: Icon,
  handleClick,
  title,
  cy,
  iconSize,
}) => {
  const onClick = () => {
    if (handleClick) handleClick();
  };

  const Content = (
    <div className="flex w-full items-center">
      {SecondaryIcon ? (
        <div className="relative">
          <Icon size={25} />
          <span className="absolute -right-2 -top-1">
            <SecondaryIcon color="red" />
          </span>
        </div>
      ) : (
        <Icon size={iconSize || 25} color="gray" />
      )}

      <span className={'ml-2 text-text-nav'} data-cy={cy ? cy : ''}>
        {title}
      </span>
    </div>
  );

  if (href) {
    return <Link to={href}>{Content}</Link>;
  } else {
    return <button onClick={onClick}>{Content}</button>;
  }
};

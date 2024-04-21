import React, { PropsWithChildren } from 'react';

export const SideBarList: React.FC<PropsWithChildren> = React.memo(({ children }) => {
  return <ul className="mb-3 flex flex-col gap-2">{children}</ul>;
});
SideBarList.displayName = 'SideBarList';

import { TClassName } from '@types';
import React, { PropsWithChildren } from 'react';
import { IconType } from 'react-icons';

export interface ILogoSideBar {
  triggerRef: React.RefObject<HTMLButtonElement>;
  sidebarOpen: boolean;
  toggleSideBar: () => void;
}

export interface ISidebar {
  sidebarOpen: boolean;
  setSidebarOpen: (_arg: boolean) => void;
}
export type THeader = {
  sidebarOpen: boolean;
  setSidebarOpen: (_arg: boolean) => void;
};

export type TMenuElement = {
  icon: IconType;
  secondaryIcon?: IconType;
  href: string;
  title: string;
};

export interface ISideBarMenu extends TClassName {
  label: string;
  showLabel?: boolean;
  activated?: boolean;
  sidebarItemClassName?: string;
  iconSize?: number;
  list: Array<TMenuElement>;
}

export interface ISideBarItem extends TClassName, TMenuElement {
  handleClick?: () => void;
  iconSize?: number;
  cy?: string;
}
export interface ISidebarDropdown extends PropsWithChildren, TClassName {
  title: string;
  state: boolean;
  handleClick?: () => void;
  iconClassName?: string;
}
export type TSideBarDropdown = {
  categories: boolean;
};

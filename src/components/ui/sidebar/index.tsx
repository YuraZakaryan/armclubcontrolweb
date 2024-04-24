import { Preloader } from '@components/ui';
import { PreloaderItem } from '@components/ui/preloader/ui';
import {
  categoriesElements,
  menuGeneralElements,
  menuGeneralSignOutElements,
  menuSignedElements,
  menuSignedWithClubAdminElements,
  menuSignOutedElements,
} from '@components/ui/sidebar/mock';
import { TSideBarDropdown } from '@components/ui/sidebar/types';
import { LogoSideBar, SidebarDropdown, SideBarMenu } from '@components/ui/sidebar/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { toggleSideBar } from '@redux/reducers';
import cn from 'classnames';
import React from 'react';

export const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { user, sideBar, me } = useAppSelector((state) => state.user);

  const [dropdownOpen, setDropdownOpen] = React.useState<TSideBarDropdown>({
    categories: false,
  });

  const { isOpen } = sideBar;

  const trigger = React.useRef<HTMLButtonElement | null>(null);
  const sidebar = React.useRef<HTMLDivElement>(null);

  const handleToggleSidebar = (state?: boolean) => {
    dispatch(toggleSideBar(state as boolean));
  };

  const toggleDropdown = (dropdown: keyof TSideBarDropdown): void => {
    setDropdownOpen(
      (prevState: TSideBarDropdown): TSideBarDropdown => ({
        ...prevState,
        [dropdown]: !prevState[dropdown],
      }),
    );
  };

  React.useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (!isOpen || sidebar.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
      handleToggleSidebar(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  const isLoading = me.isLoading;

  return (
    <aside
      ref={sidebar}
      className={cn(
        `absolute left-0 top-0 z-[9999] flex h-full w-full max-w-[280px] flex-col border-r bg-primary duration-300 ease-linear laptop-hd-min:fixed laptop-hd-min:translate-x-0`,
        isOpen ? 'translate-x-0' : '-translate-x-full',
      )}
    >
      <div className={'flex h-full flex-col justify-between text-text'}>
        <LogoSideBar triggerRef={trigger} sidebarOpen={isOpen} toggleSideBar={handleToggleSidebar} />
        <nav className={'flex h-full flex-col justify-between border-t pl-7'}>
          {isLoading ? (
            <>
              <Preloader className="w-5/6 flex-col space-y-2.5 py-5">
                <PreloaderItem className="!h-6" />
                <PreloaderItem className="!h-6" />
                <PreloaderItem className="!h-6" />
              </Preloader>
              <Preloader className="w-5/6 flex-col space-y-2.5 py-5">
                <PreloaderItem className="!h-6" />
                <PreloaderItem className="!h-6" />
                <PreloaderItem className="!h-6" />
              </Preloader>
            </>
          ) : user ? (
            <>
              <div className="flex w-full flex-col gap-3">
                <SideBarMenu showLabel label="Ընդհանուր" list={menuGeneralElements} className="laptop-hd-min:mt-5" />
                <SideBarMenu showLabel label="Կատեգորիա" list={categoriesElements} iconSize={18} />
                {/*<SidebarDropdown*/}
                {/*  title="Կատեգորիա"*/}
                {/*  state={dropdownOpen.categories}*/}
                {/*  iconClassName={dropdownOpen.categories ? 'rotate-180' : ''}*/}
                {/*  handleClick={() => toggleDropdown('categories')}*/}
                {/*>*/}
                {/*  <SideBarMenu label="Մենյու" list={categoriesElements} className="text-sm" iconSize={18} />*/}
                {/*</SidebarDropdown>*/}
              </div>

              <SideBarMenu
                label="Ընդհանուր"
                list={menuSignedElements}
                className={'relative bottom-0'}
                activated={user.activated}
              />

              <SideBarMenu
                label="Ընդհանուր"
                list={menuSignedWithClubAdminElements}
                className="relative bottom-0 tablet-min:hidden"
                activated={user.activated}
              />
            </>
          ) : (
            <>
              <SideBarMenu label="Մենյու" list={menuGeneralSignOutElements} className="laptop-hd-min:mt-5" />
              <SideBarMenu label="Ընդհանուր" list={menuSignOutedElements} className={'relative bottom-0'} />
            </>
          )}
        </nav>
      </div>
    </aside>
  );
};

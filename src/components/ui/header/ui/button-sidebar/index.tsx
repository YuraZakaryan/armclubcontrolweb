import { useAppDispatch, useAppSelector } from '@hooks';
import { toggleSideBar } from '@redux/reducers';
import cn from 'classnames';
import { RxHamburgerMenu } from 'react-icons/rx';

export const ButtonSidebar = () => {
  const dispatch = useAppDispatch();
  const { sideBar } = useAppSelector((state) => state.user);

  const handleToggleSidebar = () => {
    dispatch(toggleSideBar());
  };

  const isOpen = sideBar.isOpen;

  return (
    <button
      className={cn(
        'flex items-center justify-center rounded border-none bg-primary p-2 pb-2 laptop-hd-min:!mb-2',
        isOpen && 'laptop-hd-min:hidden',
      )}
      onClick={handleToggleSidebar}
    >
      <RxHamburgerMenu size={30} />
    </button>
  );
};

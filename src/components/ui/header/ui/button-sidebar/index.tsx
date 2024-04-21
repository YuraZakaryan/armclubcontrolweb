import { useAppDispatch } from '@hooks/index';
import { toggleSideBar } from '@redux/reducers';
import { RxHamburgerMenu } from 'react-icons/rx';

export const ButtonSidebar = () => {
  const dispatch = useAppDispatch();

  const handleToggleSidebar = (state?: boolean) => {
    dispatch(toggleSideBar(state as boolean));
  };

  return (
    <button
      className="flex items-center justify-center rounded border-none bg-primary p-2 pb-2 laptop-hd-min:hidden"
      onClick={() => handleToggleSidebar()}
    >
      <RxHamburgerMenu size={30} />
    </button>
  );
};

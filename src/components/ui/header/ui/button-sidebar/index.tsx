import { useAppDispatch } from '@hooks';
import { toggleSideBar } from '@redux/reducers';
import { RxHamburgerMenu } from 'react-icons/rx';

export const ButtonSidebar = () => {
  const dispatch = useAppDispatch();

  const handleToggleSidebar = () => {
    dispatch(toggleSideBar());
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

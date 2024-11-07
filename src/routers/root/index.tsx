import { Header, Sidebar } from '@components/ui';
import { useAppSelector } from '@hooks/redux';
import cn from 'classnames';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export const Root = () => {
  const { sideBar } = useAppSelector((state) => state.user);

  const isOpen = sideBar.isOpen;

  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ArmClubControl</title>
      </Helmet>
      <div className="flex h-screen">
        <ToastContainer autoClose={5000} pauseOnHover closeOnClick={false} />
        <Sidebar />
        <div className={cn('relative h-full w-full bg-background ', isOpen && 'laptop-hd-min:ml-[280px]')}>
          <div className={'flex h-full flex-col overflow-x-hidden px-5 laptop-hd-min:px-16'}>
            <Header />
            <div className={'h-full'}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

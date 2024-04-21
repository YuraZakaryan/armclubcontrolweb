import { Header, Sidebar } from '@components/ui';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export const Root = () => {
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
        <div className="relative h-full w-full bg-background laptop-hd-min:ml-[280px]">
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

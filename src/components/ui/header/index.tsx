import { ButtonSidebar, Navbar, Search } from '@components/ui/header/ui';
import { useAppSelector } from '@hooks';

export const Header = () => {
  const { user } = useAppSelector((state) => state.user);

  // const firstLastNameAvatar: string = `${
  //   user && user.name.slice(0, 1).toUpperCase()
  // }  ${user && user.lastname.slice(0, 1).toUpperCase()} `;

  return (
    <header className={'sticky top-0 z-[50] flex min-h-[100px] w-full rounded-lg bg-white'}>
      <section className="relative flex w-full items-center justify-between px-4">
        <div className={'flex items-center'}>
          <ButtonSidebar />
          {user ? <Navbar /> : null}
        </div>
        <Search />
      </section>
    </header>
  );
};

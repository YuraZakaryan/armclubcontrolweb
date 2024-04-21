import { Preloader } from '@components/ui';
import { HeaderBarItem } from '@components/ui/header/ui/navbar/wrapper';
import { PreloaderItem } from '@components/ui/preloader/ui';
import { useAppSelector } from '@hooks/redux';

export const Navbar = () => {
  const { me } = useAppSelector((state) => state.user);

  const isLoading = me.isLoading;

  return (
    <section className="tablet-max:hidden laptop-hd-max:ml-5">
      <ul className="flex items-center text-2xl text-text-nav">
        {isLoading ? (
          <Preloader className="items-center gap-5">
            <PreloaderItem className="!h-8 w-40" />
            <PreloaderItem className="!h-8 w-40" />
          </Preloader>
        ) : (
          <>
            <HeaderBarItem title="Իմ Ակումբները" url="/club/my-clubs" cypressId='my-clubs' />
            <HeaderBarItem title="Պատմություն" url="/club/timer-history" cypressId='timer-history' />
          </>
        )}
      </ul>
    </section>
  );
};

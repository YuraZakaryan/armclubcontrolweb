import { Breadcrumb } from '@components/ui';
import { useAppSelector } from '@hooks/redux';
import { TClub } from '@redux/types';

export const HeaderClub = () => {
  const { club } = useAppSelector((state) => state.club);

  const currentClub: TClub = club as TClub;

  return (
    <header className="flex justify-end py-2 mobile-max:mb-2 mobile-min:justify-between">
      <Breadcrumb pageName={currentClub?.title} className={'mobile-max:hidden'} />
      <p>
        {currentClub?.views}
        <span className="ml-2 text-text_success mobile-max:text-[8px] mobile-min:text-[10px]">ԴԻՏՈՒՄՆԵՐԻ ՔԱՆԱԿԸ</span>
      </p>
    </header>
  );
};

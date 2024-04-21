import { AdPoster } from '@components/screen/home/ui';
import { Loader } from '@components/ui';
import { CardList, Main } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { fetchClubsThunk } from '@redux/http/club';
import { TClub } from '@redux/types';
import { DEFAULT_PER_PAGE } from '@utils';
import { useCallback, useEffect } from 'react';

export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const { clubs } = useAppSelector((state) => state.club);

  const fetchClubs = useCallback((): void => {
    dispatch(fetchClubsThunk({ limit: DEFAULT_PER_PAGE, random: true }));
  }, []);

  useEffect((): void => {
    fetchClubs();
  }, [fetchClubs]);

  const items: TClub[] = clubs.items;
  const isLoading = clubs.isLoading;

  return isLoading ? (
    <Loader />
  ) : (
    <Main>
      <div>
        <AdPoster />
        <CardList clubs={items} />
      </div>
    </Main>
  );
};

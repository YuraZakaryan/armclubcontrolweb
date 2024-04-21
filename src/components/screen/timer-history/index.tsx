import { Loader, TimerHistory } from '@components/ui';
import { Main } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { myClubsFetchThunk } from '@redux/http';
import { TClub } from '@redux/types';
import React, { useMemo } from 'react';

export const TimerHistoryScreen = () => {
  const dispatch = useAppDispatch();
  const { items, fetch } = useAppSelector((state) => state.myClubs);
  const { user } = useAppSelector((state) => state.user);

  const fetchClubs = React.useCallback(() => {
    if (user) {
      dispatch(myClubsFetchThunk(user?._id as string));
    }
  }, [user]);

  React.useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  const memoizedClubs = useMemo(() => {
    return items.map((club: TClub) => <TimerHistory key={club._id} club={club} global={true} />);
  }, [items]);

  const isLoading = fetch.isLoading;

  return isLoading ? <Loader /> : <Main>{memoizedClubs}</Main>;
};

import { SearchCardItem, SearchCardList } from '@components/ui/header/ui/search/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks';
import { useDebounce } from '@hooks/debounce';
import { searchClubsThunk } from '@redux/http';
import { TClub } from '@redux/types';
import React, { useMemo } from 'react';

export const SearchContent = () => {
  const dispatch = useAppDispatch();
  const { searchedClubs, search } = useAppSelector((state) => state.club);

  const debouncedSearch: string = useDebounce<string>(search.content, 500);

  const items: TClub[] = searchedClubs.items;

  const fetchClubs = () => {
    dispatch(searchClubsThunk({ title: debouncedSearch }));
  };

  React.useEffect((): void => {
    fetchClubs();
  }, [debouncedSearch]);

  const memoizedClubs = useMemo(() => {
    return items.map((club: TClub) => (
      <SearchCardItem key={club._id} _id={club._id} title={club.title} picture={club.picture} timers={club.timers} />
    ));
  }, [searchedClubs]);

  return <SearchCardList>{memoizedClubs}</SearchCardList>;
};

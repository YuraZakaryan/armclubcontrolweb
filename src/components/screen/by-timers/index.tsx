import { Breadcrumb, Loader, MissingCards } from '@components/ui';
import { CardList, Main } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks';
import { fetchByTimerClubsThunk } from '@redux/http';
import { DEFAULT_PER_PAGE } from '@utils/constants';
import { Paginator } from 'primereact/paginator';
import React from 'react';
import { TClub } from '@redux/types';

export const ByTimersClubScreen = () => {
  const dispatch = useAppDispatch();
  const { byTimerClubs } = useAppSelector((state) => state.club);

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [perPage, setPerPage] = React.useState<number>(DEFAULT_PER_PAGE);

  const onPageChange = (event: { first: number; rows: number }) => {
    setCurrentPage(event.first / event.rows + 1);
    setPerPage(event.rows);
  };

  const fetchClubs = React.useCallback(() => {
    dispatch(fetchByTimerClubsThunk({ limit: perPage, skip: (currentPage - 1) * perPage, sortByTimers: true }));
  }, [dispatch, perPage, currentPage]);

  React.useEffect((): void => {
    fetchClubs();
  }, [fetchClubs]);

  const isLoading: boolean | null = byTimerClubs.isLoading;
  const totalItems: number = byTimerClubs.totalItems;
  const items: TClub[] = byTimerClubs.items;

  return isLoading || isLoading === null ? (
    <Loader />
  ) : (
    <Main>
      {totalItems === 0 ? (
        <MissingCards message="Ակումբները բացակայում են" />
      ) : (
        <>
          <Breadcrumb pageName="Բարձր վարկանիշով" />
          <CardList clubs={items} showCount />
          {totalItems > DEFAULT_PER_PAGE ? (
            <Paginator
              first={perPage * (currentPage - 1)}
              rows={perPage}
              totalRecords={totalItems}
              onPageChange={onPageChange}
              rowsPerPageOptions={[10, 20, 30]}
              className="justify-end bg-transparent"
            />
          ) : null}
        </>
      )}
    </Main>
  );
};

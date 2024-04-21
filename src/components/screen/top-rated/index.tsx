import { Breadcrumb, Loader, MissingCards } from '@components/ui';
import { CardList, Main } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks';
import { fetchTopRatedClubsThunk } from '@redux/http';
import { DEFAULT_PER_PAGE } from '@utils/constants';
import { Paginator } from 'primereact/paginator';
import React from 'react';

export const TopRatedClubsScreen = () => {
  const dispatch = useAppDispatch();
  const { topRatedClubs } = useAppSelector((state) => state.club);

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [perPage, setPerPage] = React.useState<number>(DEFAULT_PER_PAGE);

  const onPageChange = (event: { first: number; rows: number }) => {
    setCurrentPage(event.first / event.rows + 1);
    setPerPage(event.rows);
  };

  const fetchClubs = React.useCallback(() => {
    dispatch(fetchTopRatedClubsThunk({ limit: perPage, skip: (currentPage - 1) * perPage, byRating: true }));
  }, [dispatch, perPage, currentPage]);

  React.useEffect((): void => {
    fetchClubs();
  }, [fetchClubs]);

  const isLoading: boolean | null = topRatedClubs.isLoading;
  const totalItems: number = topRatedClubs.totalItems;

  return isLoading || isLoading === null ? (
    <Loader />
  ) : (
    <>
      {totalItems === 0 ? (
        <MissingCards message="Ակումբները բացակայում են" />
      ) : (
        <Main>
          <Breadcrumb pageName="Բարձր վարկանիշով" />
          <CardList clubs={topRatedClubs.items} />
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
        </Main>
      )}
    </>
  );
};

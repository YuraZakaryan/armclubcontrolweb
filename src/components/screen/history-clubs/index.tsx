import { Breadcrumb, Loader, MissingCards } from '@components/ui';
import { CardList } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks';
import { fetchClubHistoryThunk } from '@redux/http';
import { DEFAULT_PER_PAGE } from '@utils';
import { Paginator } from 'primereact/paginator';
import { useCallback, useEffect, useState } from 'react';

export const ClubHistoryScreen = () => {
  const dispatch = useAppDispatch();
  const { history } = useAppSelector((state) => state.club);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(DEFAULT_PER_PAGE);

  const onPageChange = (event: { first: number; rows: number }) => {
    setCurrentPage(event.first / event.rows + 1);
    setPerPage(event.rows);
  };

  const fetchClubs = useCallback(() => {
    dispatch(fetchClubHistoryThunk({ limit: perPage, skip: (currentPage - 1) * perPage }));
  }, [dispatch, perPage, currentPage]);

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  const isLoading: boolean | null = history.isLoading;
  const totalItems: number = history.totalItems;

  return isLoading || isLoading === null ? (
    <Loader />
  ) : (
    <>
      {totalItems === 0 ? (
        <MissingCards message="Բացակայում է ակումբային պատմությունը" />
      ) : (
        <div className="py-2">
          <Breadcrumb pageName="Վերջինները" />
          <CardList clubs={history.items} />
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
        </div>
      )}
    </>
  );
};

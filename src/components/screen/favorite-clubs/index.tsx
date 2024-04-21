import { Breadcrumb, Loader, MissingCards } from '@components/ui';
import { CardList } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks';
import { fetchFavoriteClubsThunk } from '@redux/http';
import { DEFAULT_PER_PAGE } from '@utils/constants';
import { Paginator } from 'primereact/paginator';
import React, { useState } from 'react';

export const ClubFavoriteScreen = () => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state) => state.club);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(DEFAULT_PER_PAGE);

  const onPageChange = (event: { first: number; rows: number }) => {
    setCurrentPage(event.first / event.rows + 1);
    setPerPage(event.rows);
  };

  const fetchClubs = React.useCallback(() => {
    dispatch(fetchFavoriteClubsThunk({ limit: perPage, skip: (currentPage - 1) * perPage }));
  }, [dispatch, perPage, currentPage]);

  React.useEffect((): void => {
    fetchClubs();
  }, [fetchClubs]);

  const isLoading: boolean | null = favorites.isLoading;
  const totalItems: number = favorites.totalItems;

  return isLoading || isLoading === null ? (
    <Loader />
  ) : (
    <>
      {totalItems === 0 ? (
        <MissingCards message="Չկան ընտրված ակումբներ" />
      ) : (
        <div className="py-2">
          <Breadcrumb pageName="Ընտրվածները" />
          <CardList clubs={favorites.items} />
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

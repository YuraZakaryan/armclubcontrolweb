import { useAppDispatch, useAppSelector } from '@hooks';
import React from 'react';
import { DEFAULT_PER_PAGE, getCitiesArray } from '@utils';
import { fetchByRegionClubsThunk, getLocationByYandex } from '@redux/http';
import { Breadcrumb, CustomSelect, Loader, MissingCards } from '@components/ui';
import { ButtonShadcnWithLoader, CardList, Main } from '@components/wrapper';
import { Paginator } from 'primereact/paginator';
import { TClub } from '@redux/types';
import { TPlace } from '@types';
import { regionOptions } from '@components/screen/club/data';

export const ByRegionClubScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { byRegionClubs, location } = useAppSelector((state) => state.club);

  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [perPage, setPerPage] = React.useState<number>(DEFAULT_PER_PAGE);

  const getRegionFromStorage: string | null = localStorage.getItem('region');
  const getCityFromStorage: string | null = localStorage.getItem('city');

  const [place, setPlace] = React.useState<TPlace>({
    region: getRegionFromStorage || '',
    city: getCityFromStorage || '',
  });

  const handleLocation = (): void => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition): void => {
        const { coords } = position;
        dispatch(getLocationByYandex({ latitude: coords.latitude.toString(), longitude: coords.longitude.toString() }));
      },
      (error: GeolocationPositionError): void => {
        console.error('Error getting user location:', error);
      },
    );
  };

  const onPageChange = (event: { first: number; rows: number }): void => {
    setCurrentPage(event.first / event.rows + 1);
    setPerPage(event.rows);
  };

  const fetchClubs = React.useCallback((): void => {
    dispatch(
      fetchByRegionClubsThunk({
        limit: perPage,
        skip: (currentPage - 1) * perPage,
        region: place.region,
        city: place.city,
      }),
    );
  }, [dispatch, perPage, currentPage, place]);

  React.useEffect((): void => {
    fetchClubs();
  }, [fetchClubs]);

  const handleRegionChange = (region: string): void => {
    setPlace({ region, city: '' });
    localStorage.setItem('region', region);
    localStorage.removeItem('city');
  };

  const handleCityChange = (city: string): void => {
    setPlace((prevPlace: TPlace) => ({ ...prevPlace, city }));
    localStorage.setItem('city', city);
  };

  const isLoading: boolean | null = byRegionClubs.isLoading;
  const isLocationLoading: boolean | null = location.isLoading;
  const totalItems: number = byRegionClubs.totalItems;
  const items: TClub[] = byRegionClubs.items;

  React.useEffect((): void => {
    if (isLocationLoading !== null) {
      setPlace({
        region: location.place.region,
        city: location.place.city,
      });
      localStorage.setItem('region', location.place.region);
      localStorage.setItem('city', location.place.city);
    }
  }, [location]);

  const handleClear = (): void => {
    setPlace({
      region: '',
      city: '',
    });
    localStorage.removeItem('region');
    localStorage.removeItem('city');
  };

  return isLoading || isLoading === null ? (
    <Loader />
  ) : (
    <Main>
      <Breadcrumb className="tablet-max:py-2" pageName="Ըստ տարածաշրջանի" />
      <div className="flex w-full gap-3 tablet-max:flex-col tablet-min:items-end">
        <CustomSelect
          label="Տարածաշրջան"
          name="region"
          value={place.region}
          onChange={handleRegionChange}
          options={regionOptions}
        />
        <CustomSelect
          label="Քաղաք"
          name="city"
          value={place.city}
          onChange={handleCityChange}
          options={getCitiesArray(place.region)}
        />
        <ButtonShadcnWithLoader
          type="button"
          className="!whitespace-normal py-5 tablet-max:!text-sm laptop-hd-max:text-xs laptop-hd-min:min-w-[249px]"
          handleClick={(): void => handleLocation()}
          text="Որոնում ըստ գտնվելու վայրի"
        />
        <ButtonShadcnWithLoader
          type="button"
          className="!whitespace-normal py-5 tablet-max:!text-sm laptop-hd-max:text-xs"
          handleClick={(): void => handleClear()}
          text="Ջնջել տվյալները"
        />
      </div>
      {totalItems === 0 ? (
        <MissingCards message="Ակումբները բացակայում են" />
      ) : (
        <>
          <CardList clubs={items} />
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

import { ClubComments, ClubTimers, HeaderClub, InformationClub } from '@components/screen/club/ui';
import { Loader, MapYandex } from '@components/ui';
import { Main } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { fetchClubThunk } from '@redux/http/club';
import { TComment } from '@redux/types';
import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';

export const ClubScreen = () => {
  const { clubId } = useParams();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { club, fetchClub: clubStatus } = useAppSelector((state) => state.club);

  const fetchClub = useCallback(() => {
    dispatch(fetchClubThunk(clubId as string));
  }, [clubId]);

  React.useEffect(() => {
    fetchClub();
  }, [fetchClub]);

  React.useEffect(() => {
    if (clubStatus.isError) {
      navigate('/');
    }
  }, [clubStatus]);

  const showMap = club?.latitudeMap && club?.latitudeMap;
  const isLoading = clubStatus.isLoading;

  return isLoading ? (
    <Loader />
  ) : (
    <Main>
      <Helmet>
        <title>{club?.title || ''} համակարգչային ակումբ</title>
      </Helmet>
      <HeaderClub />
      <div className={'flex flex-col gap-4 pb-4'}>
        <InformationClub />
        <div
          className={'flex overflow-hidden rounded-lg tablet-max:flex-col tablet-min:border tablet-min:border-gray-300'}
        >
          <section className="relative w-full overflow-hidden tablet-max:m-3 tablet-max:w-full tablet-min:ml-3">
            <ClubTimers />
          </section>
          {showMap ? (
            <section className={'relative m-4 w-full overflow-hidden rounded-lg tablet-max:w-full tablet-min:pl-10'}>
              <MapYandex center={[Number(club?.latitudeMap), Number(club?.longitudeMap)]} zoom={16} />
            </section>
          ) : null}
        </div>
        <div
          className={
            'flex w-full flex-col gap-2 tablet-max:mt-3 tablet-max:border-t tablet-max:border-gray-600 tablet-max:pt-3 tablet-min:ml-3'
          }
        >
          <h2>Մեկնաբանություններ</h2>
          <ClubComments comments={club?.comments as TComment[]} clubId={clubId as string} />
        </div>
      </div>
    </Main>
  );
};

import { ControlTimer } from '@components/screen/club-control/ui';
import { Breadcrumb, TimerHistory } from '@components/ui';
import { Main } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { fetchClubThunk } from '@redux/http';
import { TClub } from '@redux/types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';

export const ClubControlScreen = () => {
  const { clubId } = useParams();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { club } = useAppSelector((state) => state.club);

  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const fetchClub = React.useCallback(() => {
    dispatch(fetchClubThunk(clubId as string));
  }, []);

  React.useEffect(() => {
    fetchClub();
  }, []);

  React.useEffect(() => {
    if (user) {
      const foundClub = user?.clubs.find((club) => club._id === clubId);
      if (!foundClub) {
        navigate('/');
      }
    }
  }, [user]);

  return (
    <Main>
      <Helmet>
        <title>{club?.title || ''}</title>
      </Helmet>
      <Breadcrumb className="py-2" pageName={club?.title as string} />
      <div className="flex flex-col gap-3">
        <section>
          <ControlTimer clubId={clubId as string} isLoading={isLoading} setIsLoading={setIsLoading} />
        </section>
        <section>
          <TimerHistory club={club as TClub} />
        </section>
      </div>
    </Main>
  );
};

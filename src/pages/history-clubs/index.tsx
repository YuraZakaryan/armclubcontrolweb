import { ClubHistoryScreen } from '@components/screen';
import { Helmet } from 'react-helmet';

export const HistoryClubs = () => {
  return (
    <>
      <Helmet>
        <title>Ակումբային պատմություն</title>
      </Helmet>
      <ClubHistoryScreen />
    </>
  );
};

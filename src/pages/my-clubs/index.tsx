import { MyClubsScreen } from '@components/screen';
import { Helmet } from 'react-helmet';

export const MyClubs = () => {
  return (
    <>
      <Helmet>
        <title>Իմ ակումբները</title>
      </Helmet>
      <MyClubsScreen />;
    </>
  );
};

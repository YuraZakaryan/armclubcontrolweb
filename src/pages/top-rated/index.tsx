import { TopRatedClubsScreen } from '@components/screen';
import { Helmet } from 'react-helmet';

export const TopRatedClubs = () => {
  return (
    <>
      <Helmet>
        <title>Բարձր վարկանիշով</title>
      </Helmet>
      <TopRatedClubsScreen />
    </>
  );
};

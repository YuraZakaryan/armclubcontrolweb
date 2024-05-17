import { ByRegionClubScreen } from '@components/screen';
import { Helmet } from 'react-helmet';

export const ByRegionClub = () => {
  return (
    <>
      <Helmet>
        <title>Ըստ տարածաշրջանի</title>
        <meta title="description" content="Փնտրել ակումբներ, ըստ տարածաշրջանի" />
      </Helmet>
      <ByRegionClubScreen />
    </>
  );
};

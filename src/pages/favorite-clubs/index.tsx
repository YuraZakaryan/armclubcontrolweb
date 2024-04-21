import { ClubFavoriteScreen } from '@components/screen';
import { Helmet } from 'react-helmet';

export const FavoriteClubs = () => {
  return (
    <>
      <Helmet>
        <title>Ընտրված ակումբներ</title>
      </Helmet>
      <ClubFavoriteScreen />
    </>
  );
};

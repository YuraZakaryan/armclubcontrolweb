import { ProfileScreen } from '@components/screen';
import { Helmet } from 'react-helmet';

export const Profile = () => {
  return (
    <>
      <Helmet>
        <title>Իմ էջը</title>
      </Helmet>
      <ProfileScreen />
    </>
  );
};

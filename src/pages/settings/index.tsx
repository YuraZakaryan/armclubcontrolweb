import { SettingsScreen } from '@components/screen';
import { Helmet } from 'react-helmet';

export const Settings = () => {
  return (
    <>
      <Helmet>
        <title>Կարգավորումներ</title>
      </Helmet>
      <SettingsScreen />
    </>
  );
};

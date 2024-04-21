import { TimerHistoryScreen } from '@components/screen';
import { Helmet } from 'react-helmet';

export const TimerHistory = () => {
  return (
    <>
      <Helmet>
        <title>Ժամ․ պատմություն</title>
      </Helmet>
      <TimerHistoryScreen />;
    </>
  );
};

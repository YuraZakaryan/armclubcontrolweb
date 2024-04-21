import { MyClubsTable } from '@components/screen/my-clubs/ui';
import { ButtonAddClub } from '@components/screen/my-clubs/wrapper';
import { Breadcrumb } from '@components/ui';
import { Main } from '@components/wrapper';

export const MyClubsScreen = () => {
  return (
    <Main>
      <Breadcrumb className="py-2" pageName="Իմ ակումբները" />
      <ButtonAddClub />
      <MyClubsTable />
    </Main>
  );
};

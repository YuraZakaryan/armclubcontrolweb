import { ChangePasswordProfile, GeneralProfile } from '@components/screen/profile/ui';
import { Breadcrumb, Loader } from '@components/ui';
import { Main } from '@components/wrapper';
import { useAppSelector } from '@hooks';

export const ProfileScreen = () => {
  const { me } = useAppSelector((state) => state.user);

  const isLoading: boolean | null = me.isLoading;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Main>
      <Breadcrumb pageName="Իմ էջը" />
      <h1 className="text-2xl">Իմ էջը</h1>
      <div className="my-5 flex flex-col rounded border border-gray-600">
        <header className="border-b border-gray-600 p-5">
          <h2>Անձնական տվյալներ</h2>
        </header>
        <GeneralProfile className="border-b border-gray-400 pb-5" />
        <ChangePasswordProfile />
      </div>
    </Main>
  );
};

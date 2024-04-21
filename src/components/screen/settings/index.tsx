import { SettingsClubsTable, SettingsTimersTable } from '@components/screen/settings/ui';
import { Accordion } from '@components/shadcn/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/shadcn/ui/tabs';
import { Breadcrumb, Loader } from '@components/ui';
import { Main } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useActiveTab } from '@hooks/tab';
import { myClubsFetchThunk } from '@redux/http';
import { TClub } from '@redux/types';
import React, { useCallback } from 'react';

export const SettingsScreen = React.memo(() => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);
  const { items, fetch } = useAppSelector((state) => state.myClubs);
  const [accordion, setAccordion] = React.useState<string>('item-1');
  const { activeTab, handleTabClick } = useActiveTab('activeSettingsTab', 'settings-clubs');

  const fetchClubs = useCallback(() => {
    if (user) {
      dispatch(myClubsFetchThunk(user?._id));
    }
  }, [user]);

  React.useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  const isLoading = fetch.isLoading;

  return isLoading ? (
    <Loader />
  ) : (
    <Main>
      <Breadcrumb pageName="Կարգավորումներ" />
      <Tabs defaultValue={activeTab}>
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="settings-clubs" onClick={() => handleTabClick('settings-clubs')}>
            <h2 className="font-bold">Ակումբներ</h2>
          </TabsTrigger>
          <TabsTrigger value="settings-timers" onClick={() => handleTabClick('settings-timers')}>
            <h2 className="font-bold">Ժամանակաչափեր</h2>
          </TabsTrigger>
        </TabsList>
        <TabsContent value={'settings-clubs'} className="mt-6">
          <Accordion type="single" collapsible className="mb-3 w-full" value={accordion} onValueChange={setAccordion}>
            <SettingsClubsTable />
          </Accordion>
        </TabsContent>
        <TabsContent value="settings-timers" className={'mt-6'}>
          <Accordion type="single" collapsible className="mb-3 w-full" value={accordion} onValueChange={setAccordion}>
            {items.map((club: TClub, index: number) => (
              <SettingsTimersTable key={club._id} index={index + 1} timers={club.timers} clubTitle={club.title} />
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </Main>
  );
});

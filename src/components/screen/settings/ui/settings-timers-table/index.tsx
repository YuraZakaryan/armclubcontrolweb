import { ISettingsTimersTable } from '@components/screen/settings/types';
import { EditTimer } from '@components/screen/settings/ui';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@components/shadcn/ui/accordion';
import { ConfirmDeleteDialog } from '@components/ui';
import { CustomTable } from '@components/wrapper';
import { CustomTableCell, CustomTableHeaderItem, CustomTableRow } from '@components/wrapper/custom-table/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks';
import { deleteTimerThunk } from '@redux/http';
import { TTimer } from '@redux/types';
import React from 'react';

export const SettingsTimersTable: React.FC<ISettingsTimersTable> = (props) => {
  const { index, clubTitle, timers, global } = props;

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const [confirmText, setConfirmText] = React.useState<string>('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setConfirmText(event.target.value);
  };

  const handleClick = (id: string): void => {
    if (user) {
      dispatch(deleteTimerThunk({ userId: user?._id, timerId: id }));
    }
  };

  return (
    <AccordionItem value={`item-${index}`}>
      <AccordionTrigger>{global ? 'Ակումբ' : clubTitle}</AccordionTrigger>
      <AccordionContent>
        <CustomTable
          caption={Array.isArray(timers) && timers.length === 0 ? 'Դուք դեռ չունեք ժամանակաչափեր' : ''}
          header={
            <React.Fragment>
              <CustomTableHeaderItem>ID</CustomTableHeaderItem>
              <CustomTableHeaderItem>Անվանումը</CustomTableHeaderItem>
              <CustomTableHeaderItem className="text-right">Փոփոխել</CustomTableHeaderItem>
              <CustomTableHeaderItem className="w-[70px] text-right">Ջնջել</CustomTableHeaderItem>
            </React.Fragment>
          }
          body={
            Array.isArray(timers) &&
            timers.map((timer: TTimer, index: number) => (
              <CustomTableRow key={timer._id}>
                <CustomTableCell>{index + 1}</CustomTableCell>
                <CustomTableCell>{timer.title}</CustomTableCell>
                <CustomTableCell className="text-end">
                  <EditTimer _id={timer._id} title={timer.title} dialogKey={timer._id} />
                </CustomTableCell>
                <CustomTableCell className="flex justify-end">
                  <ConfirmDeleteDialog
                    _id={timer._id}
                    label="Ժամանակաչափ"
                    title={timer.title}
                    onChange={handleChange}
                    handleClick={handleClick}
                    confirmText={confirmText}
                  />
                </CustomTableCell>
              </CustomTableRow>
            ))
          }
        />
      </AccordionContent>
    </AccordionItem>
  );
};

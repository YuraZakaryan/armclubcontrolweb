import { CustomTable } from '@components/wrapper';
import { TimerPercent } from '@components/wrapper/custom-table/ui';
import { CustomTableCell, CustomTableHeaderItem, CustomTableRow } from '@components/wrapper/custom-table/wrapper';
import { useAppSelector } from '@hooks/redux';
import { TTimer } from '@redux/types';
import React from 'react';

export const ClubTimers = () => {
  const { club } = useAppSelector((state) => state.club);

  const timers: TTimer[] = club?.timers as TTimer[];

  return (
    <CustomTable
      caption={timers && timers.length === 0 ? 'Համակարգիչները բացակայում են' : ''}
      header={
        <React.Fragment>
          <CustomTableHeaderItem>ID</CustomTableHeaderItem>
          <CustomTableHeaderItem>Անվանումը</CustomTableHeaderItem>
          <CustomTableHeaderItem>Պրոցես</CustomTableHeaderItem>
          <CustomTableHeaderItem>Մնաց</CustomTableHeaderItem>
          <CustomTableHeaderItem>Վերջնաժամկետ</CustomTableHeaderItem>
          <CustomTableHeaderItem>Հերթի մեջ</CustomTableHeaderItem>
        </React.Fragment>
      }
      body={
        Array.isArray(timers) &&
        timers.map((timer: TTimer, index: number) => (
          <CustomTableRow key={timer._id}>
            <CustomTableCell>{index + 1}</CustomTableCell>
            <CustomTableCell>{timer.title}</CustomTableCell>
            <CustomTableCell>
              <TimerPercent
                isActive={timer.isActive}
                isInfinite={timer.isInfinite}
                remainingTime={timer.remainingTime}
                defineTime={timer.defineTime}
              />
            </CustomTableCell>
            <CustomTableCell>
              {!timer.remainingTime ? '--_--' : timer.isInfinite ? 'Անորոշ' : timer.remainingTime}
            </CustomTableCell>
            <CustomTableCell>{!timer.end ? '--_--' : timer.end.slice(0, 5)}</CustomTableCell>
            <CustomTableCell>{!timer.waitingCount ? 0 : timer.waitingCount}</CustomTableCell>
          </CustomTableRow>
        ))
      }
    />
  );
};

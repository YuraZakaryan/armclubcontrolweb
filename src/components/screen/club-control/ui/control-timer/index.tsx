import { IControlTimer } from '@components/screen/club-control/types';
import { DialogFinish, TimerEditButtons } from '@components/screen/club-control/ui';
import { ControlNotify } from '@components/screen/club-control/wrapper';
import { Loader } from '@components/ui';
import { CustomTable } from '@components/wrapper';
import { TimerPercent } from '@components/wrapper/custom-table/ui';
import { CustomTableCell, CustomTableHeaderItem, CustomTableRow } from '@components/wrapper/custom-table/wrapper';
import { TTimer } from '@redux/types';
import { API_URL, convertMomentDateToMinutes, formattedPrice } from '@utils';
import React from 'react';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import { AddNewTimer } from '../add-new-timer';

export const ControlTimer: React.FC<IControlTimer> = React.memo((props) => {
  const { clubId, setIsLoading, isLoading } = props;
  const [endedTimer, setEndedTimer] = React.useState<TTimer | null>(null);
  const [openFinalDialog, setOpenFinalDialog] = React.useState<boolean>(false);
  const [timers, setTimers] = React.useState<TTimer[]>([]);

  React.useEffect((): void => {
    const socket = io(API_URL, {
      query: {
        club: clubId,
      },
    });
    socket.on('timer-updated', (timersData: TTimer[]) => {
      try {
        // @ts-ignore
        const timers = JSON.parse(timersData);
        setTimers(timers);
        if (isLoading) {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error parsing timers:', error);
      }
    });
  }, [clubId]);

  React.useEffect((): void => {
    const timersWithZeroRemaining: TTimer[] = timers.filter((timer: TTimer) => timer.expired);

    if (timersWithZeroRemaining.length > 0) {
      timersWithZeroRemaining.forEach((timer: TTimer, index: number): void => {
        const timerIndex = timers.indexOf(timer) + 1;

        if (openFinalDialog) {
          toast(<ControlNotify endedTimer={timer} />, {
            autoClose: 50000,
            pauseOnHover: true,
          });
        } else {
          setTimeout(() => {
            if (index === 0) {
              setEndedTimer({ ...timer, index: timerIndex });
              setOpenFinalDialog(true);
            } else {
              toast(<ControlNotify endedTimer={timer} />);
            }
          }, 2000 * index);
        }
      });
    }
  }, [timers]);

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader className="min-h-[84vh]" />
      ) : (
        <section>
          <AddNewTimer />
          {endedTimer && (
            <DialogFinish
              openFinalDialog={openFinalDialog}
              setOpenFinalDialog={setOpenFinalDialog}
              endedTimer={endedTimer}
            />
          )}
          <CustomTable
            caption={timers && timers.length === 0 ? 'Դուք դեռ չունեք ժամանակաչափեր' : ''}
            header={
              <React.Fragment>
                <CustomTableHeaderItem>ID</CustomTableHeaderItem>
                <CustomTableHeaderItem>Անվանումը</CustomTableHeaderItem>
                <CustomTableHeaderItem>Սկիզբ</CustomTableHeaderItem>
                <CustomTableHeaderItem>Ժամանակ</CustomTableHeaderItem>
                <CustomTableHeaderItem>Պրոցես</CustomTableHeaderItem>
                <CustomTableHeaderItem>Մնաց / Անցավ</CustomTableHeaderItem>
                <CustomTableHeaderItem>Վերջնաժամկետ</CustomTableHeaderItem>
                <CustomTableHeaderItem>Գինը</CustomTableHeaderItem>
                <CustomTableHeaderItem className="laptop-hd-min:hidden">Փոփոխել</CustomTableHeaderItem>
                <CustomTableHeaderItem className="laptop-hd-max:hidden">Ընդմիջում</CustomTableHeaderItem>
                <CustomTableHeaderItem className="laptop-hd-max:hidden">Կարգավիճակ</CustomTableHeaderItem>
                <CustomTableHeaderItem className="laptop-hd-max:hidden">Փոփոխել</CustomTableHeaderItem>
              </React.Fragment>
            }
            body={
              Array.isArray(timers) &&
              timers.map((timer: TTimer, index: number) => (
                <CustomTableRow key={timer._id}>
                  <CustomTableCell>{index + 1}</CustomTableCell>
                  <CustomTableCell> {timer.title}</CustomTableCell>
                  <CustomTableCell>{!timer.start ? '--_--' : convertMomentDateToMinutes(timer.start)}</CustomTableCell>
                  <CustomTableCell>{!timer.defineTime ? '--_--' : timer.defineTime}</CustomTableCell>
                  <CustomTableCell>
                    <TimerPercent
                      isActive={timer.isActive}
                      isInfinite={timer.isInfinite}
                      remainingTime={timer.remainingTime}
                      defineTime={timer.defineTime}
                    />
                  </CustomTableCell>
                  <CustomTableCell>{!timer.remainingTime ? '--_--' : timer.remainingTime}</CustomTableCell>
                  <CustomTableCell>{!timer.end ? '--_--' : convertMomentDateToMinutes(timer.end)}</CustomTableCell>
                  {!timer.price ? (
                    <CustomTableCell className="text-slate-400/90">N/A</CustomTableCell>
                  ) : (
                    <CustomTableCell>{formattedPrice(timer.price)}․դր</CustomTableCell>
                  )}

                  <TimerEditButtons
                    timerId={timer._id}
                    isInfinite={timer.isInfinite}
                    price={timer.price}
                    isPaused={timer.paused}
                    defineTime={timer.defineTime}
                    remainingTime={timer.remainingTime}
                    isActive={timer.isActive}
                    paused={timer.paused}
                    waitingCount={timer.waitingCount}
                  />
                </CustomTableRow>
              ))
            }
          />
        </section>
      )}
    </React.Fragment>
  );
});
ControlTimer.displayName = 'ControlTimer';

import { IControlTimer } from '@components/screen/club-control/types';
import { DialogFinish, TimerEditButtons } from '@components/screen/club-control/ui';
import { Loader } from '@components/ui';
import { CustomTable } from '@components/wrapper';
import { TimeRemaining, TimerPercent } from '@components/wrapper/custom-table/ui';
import { CustomTableCell, CustomTableHeaderItem, CustomTableRow } from '@components/wrapper/custom-table/wrapper';
import { TFinishedTimer, TTimer } from '@redux/types';
import { API_URL, convertMomentDateToMinutes, formattedPrice } from '@utils';
import React from 'react';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import { ControlNotify } from '../../wrapper/control-notify';
import { AddNewTimer } from '../add-new-timer';

export const ControlTimer: React.FC<IControlTimer> = React.memo((props) => {
  const { clubId, setIsLoading, isLoading } = props;
  const [endedTimer, setEndedTimer] = React.useState<TFinishedTimer[] | null>(null);
  const [openFinalDialog, setOpenFinalDialog] = React.useState<boolean>(false);
  const [timers, setTimers] = React.useState<TTimer[]>([]);
  const [notificationQueue, setNotificationQueue] = React.useState<TFinishedTimer[]>([]);
  const [isNotifying, setIsNotifying] = React.useState<boolean>(false);
  const [zeroRemainingTimers, setZeroRemainingTimers] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
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

    socket.on('timer-finished', (timer: TFinishedTimer) => {
      try {
        // @ts-ignore
        const parsedTimer = JSON.parse(timer);
        setEndedTimer((prev) => (prev ? [...prev, parsedTimer] : [parsedTimer]));
        setZeroRemainingTimers((prev) => {
          const updatedSet = new Set(prev);
          updatedSet.delete(parsedTimer._id);
          return updatedSet;
        });
        if (openFinalDialog) {
          setNotificationQueue((prev) => [...prev, parsedTimer]);
        }
      } catch (error) {
        console.error('Error updating timers:', error);
      }
    });

    return () => {
      socket.off('timer-finished');
      socket.disconnect();
    };
  }, [clubId]);

  React.useEffect(() => {
    if (!openFinalDialog && endedTimer && endedTimer.length > 0) {
      setOpenFinalDialog(true);
    } else if (openFinalDialog && notificationQueue.length > 0) {
      const [currentNotification, ...remainingQueue] = notificationQueue;
      setNotificationQueue(remainingQueue);
      setIsNotifying(true);
      toast(<ControlNotify timer={currentNotification} />, {
        autoClose: 50000,
        pauseOnHover: true,
        onClose: () => setIsNotifying(false),
      });
    }
  }, [endedTimer, openFinalDialog, notificationQueue, isNotifying]);

  React.useEffect(() => {
    console.log(zeroRemainingTimers);
  }, [zeroRemainingTimers]);

  const handleCloseDialog = () => {
    setOpenFinalDialog(false);
    setEndedTimer((prev) => (prev && prev.length > 1 ? prev.slice(0, -1) : []));
  };

  const handleTimeUp = (timerId: string) => {
    setZeroRemainingTimers((prev) => new Set(prev).add(timerId));
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader className="min-h-[84vh]" />
      ) : (
        <section>
          <AddNewTimer />
          {openFinalDialog && endedTimer && endedTimer.length > 0 && (
            <DialogFinish
              openFinalDialog={openFinalDialog}
              setOpenFinalDialog={handleCloseDialog}
              timer={endedTimer[endedTimer.length - 1]}
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
                <CustomTableRow key={timer._id} isLoading={zeroRemainingTimers.has(timer._id)}>
                  <CustomTableCell>{index + 1}</CustomTableCell>
                  <CustomTableCell> {timer.title}</CustomTableCell>
                  <CustomTableCell className="whitespace-nowrap">
                    {!timer.start ? '--:--:--' : convertMomentDateToMinutes(timer.start)}
                  </CustomTableCell>
                  <CustomTableCell className="whitespace-nowrap">
                    {!timer.defineTime ? '--:--:--' : timer.defineTime}
                  </CustomTableCell>
                  <CustomTableCell>
                    <TimerPercent
                      timerId={timer._id}
                      isActive={timer.isActive}
                      isInfinite={timer.isInfinite}
                      isPause={timer.paused}
                      pausePeriods={timer.pausePeriods}
                      start={timer.start}
                      end={timer.end}
                      onTimeUp={handleTimeUp}
                    />
                  </CustomTableCell>
                  <CustomTableCell className="whitespace-nowrap">
                    <TimeRemaining
                      start={timer.start}
                      end={timer.end}
                      isActive={timer.isActive}
                      isInfinite={timer.isInfinite}
                      isPause={timer.paused}
                    />
                  </CustomTableCell>
                  <CustomTableCell className="whitespace-nowrap">
                    {!timer.end ? '--:--:--' : convertMomentDateToMinutes(timer.end)}
                  </CustomTableCell>
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

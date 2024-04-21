import { ITimerEditButtons } from '@components/screen/club-control/types';
import { DialogStop, EditControlTimer } from '@components/screen/club-control/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components/shadcn/ui/dropdown-menu';
import { EditButtonStyled } from '@components/wrapper';
import { CustomTableCell } from '@components/wrapper/custom-table/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { startTimerThunk, togglePauseTimerThunk } from '@redux/http';
import { getCurrentTimeForTimer } from '@utils';
import React from 'react';
import { FaPlay } from 'react-icons/fa6';
import { GoKebabHorizontal } from 'react-icons/go';
import { HiPause } from 'react-icons/hi2';

export const TimerEditButtons: React.FC<ITimerEditButtons> = React.memo((props) => {
  const { timerId, remainingTime, defineTime, paused, isInfinite, isActive, isPaused, price, waitingCount } = props;

  const dispatch = useAppDispatch();
  const { togglePauseTimer } = useAppSelector((state) => state.timer);

  const [changeDialog, setChangeDialog] = React.useState<boolean>(false);

  const currentTimerStartTime: string = getCurrentTimeForTimer();

  const togglePause = (): void => {
    dispatch(
      togglePauseTimerThunk({
        timerId,
        currentStartTime: currentTimerStartTime,
      }),
    );
  };

  const startTimer = (): void => {
    dispatch(
      startTimerThunk({
        timerId,
        currentStartTime: currentTimerStartTime,
      }),
    );
  };

  const isPauseLoading: boolean = togglePauseTimer.isLoading as boolean;

  return (
    <React.Fragment>
      <CustomTableCell className={'flex items-center justify-center laptop-hd-min:hidden'}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <GoKebabHorizontal size={30} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <button className={'py-1'}>
                {isActive && !paused ? (
                  <button onClick={() => togglePause()}>Ընդմիջում</button>
                ) : paused ? (
                  <button onClick={() => togglePause()}>Շարունակել</button>
                ) : (
                  <button className={'text-gray-500'} disabled={true}>
                    Ընդմիջում
                  </button>
                )}
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button className={'py-1'}>
                {isInfinite || remainingTime ? (
                  !isActive ? (
                    <button onClick={() => startTimer()}>Սկիզբ</button>
                  ) : (
                    <DialogStop id={timerId} />
                  )
                ) : (
                  <button className={'text-gray-500'} disabled={true}>
                    Սկիզբ
                  </button>
                )}
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <EditControlTimer
                id={timerId}
                isActive={isActive}
                isInfinite={isInfinite}
                price={price}
                waitingCount={waitingCount}
                isPaused={isPaused}
                defineTime={defineTime}
                setChangeDialog={setChangeDialog}
                changeDialog={changeDialog}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CustomTableCell>
      <>
        <CustomTableCell className="laptop-hd-max:hidden">
          {isActive && !paused ? (
            <EditButtonStyled icon={HiPause} disabled={isPauseLoading} handleClick={() => togglePause()} />
          ) : paused ? (
            <EditButtonStyled
              icon={FaPlay}
              disabled={isPauseLoading}
              className="animate-pulse"
              iconSize={16}
              handleClick={() => togglePause()}
            />
          ) : (
            <EditButtonStyled icon={HiPause} className="opacity-10" disabled={true} />
          )}
        </CustomTableCell>
        <CustomTableCell className=" laptop-hd-max:hidden">
          {isInfinite || remainingTime ? (
            !isActive ? (
              <button onClick={() => startTimer()}>Սկիզբ</button>
            ) : (
              <DialogStop id={timerId} />
            )
          ) : (
            ''
          )}
        </CustomTableCell>
        <CustomTableCell className="laptop-hd-max:hidden">
          <EditControlTimer
            id={timerId}
            isActive={isActive}
            isInfinite={isInfinite}
            price={price}
            waitingCount={waitingCount}
            isPaused={isPaused}
            defineTime={defineTime}
            setChangeDialog={setChangeDialog}
            changeDialog={changeDialog}
          />
        </CustomTableCell>
      </>
    </React.Fragment>
  );
});
TimerEditButtons.displayName = 'TimerEditButtons';

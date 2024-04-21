import { IDialogStop } from '@components/screen/club-control/types';
import { Button } from '@components/shadcn/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/shadcn/ui/dialog';
import { ButtonShadcnWithLoader, EditButtonStyled } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { stopTimerThunk } from '@redux/http';
import { toggleTimerEditDialog } from '@redux/reducers';
import React from 'react';
import { BsFillStopFill } from 'react-icons/bs';

export const DialogStop: React.FC<IDialogStop> = React.memo((props) => {
  const { id } = props;

  const dispatch = useAppDispatch();
  const { stopTimer, timerEditDialog } = useAppSelector((state) => state.timer);
  const handleStopTimer = (): void => {
    dispatch(stopTimerThunk(id));
  };

  const toggleDialog = (): void => {
    dispatch(toggleTimerEditDialog());
  };

  const isLoading: boolean = stopTimer.isLoading as boolean;

  return (
    <Dialog open={timerEditDialog} onOpenChange={toggleDialog}>
      <DialogTrigger>
        <EditButtonStyled
          icon={BsFillStopFill}
          disabled={isLoading}
          iconColor="red"
          className="text-red-700 laptop-hd-max:hidden"
        />
        <button className={'p-0 font-bold'}>
          <span className={'laptop-hd-min:hidden'}>Կանգնեցնել</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className={'text-base leading-6'}>
            Արդյո՞ք համոզվածեք ժամանակացույցի կանգնեցման հարցում
          </DialogTitle>
          <DialogDescription>Հիշեցում՝, այս պրոցեսը հետ վերականգման ենթակա չէ</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <ButtonShadcnWithLoader
              text="ԿԱՆԳՆԵՑՆԵԼ"
              disabled={isLoading}
              isLoading={isLoading}
              className="!hover:bg-red-700 min-w-[134px] !bg-red-800 text-white hover:text-white/90"
              handleClick={async (): Promise<void> => handleStopTimer()}
            />
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary" className={'text-text'}>
              ՓԱԿԵԼ
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
DialogStop.displayName = 'DialogStop';

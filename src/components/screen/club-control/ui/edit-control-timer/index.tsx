import { editTimerThunk } from '@redux/http';
import { IEditRow, TEditTImer } from '@components/screen/club-control/types';
import { Button } from '@components/shadcn/ui/button';
import { Checkbox } from '@components/shadcn/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/shadcn/ui/dialog';
import { ButtonShadcnWithLoader, EditButtonStyled, InputWithLabel } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import cn from 'classnames';
import React from 'react';
import 'react-clock/dist/Clock.css';
import { MdEdit } from 'react-icons/md';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

export const EditControlTimer: React.FC<IEditRow> = React.memo((props) => {
  const { id, isActive, isInfinite, isPaused, changeDialog, setChangeDialog, price, waitingCount, defineTime } = props;

  const dispatch = useAppDispatch();
  const { editTimer } = useAppSelector((state) => state.timer);

  const [editTimerForm, setEditTimerForm] = React.useState<TEditTImer>({
    remainingTime: '00:00',
    price: 0,
    waitingCount: 0,
    isInfinite: false,
  });

  React.useEffect((): void => {
    setEditTimerForm((prevState) => ({
      ...prevState,
      remainingTime: defineTime && !isInfinite ? defineTime : '00:00',
      price: price ? price : 0,
      waitingCount: waitingCount ? waitingCount : 0,
    }));
  }, [id, isInfinite, price, defineTime, waitingCount]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    const { value, name } = e.target;
    setEditTimerForm((prev: TEditTImer) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChangeCheckbox = (isChecked: boolean): void => {
    setEditTimerForm((prev: TEditTImer) => ({
      ...prev,
      remainingTime: '00:00',
      isInfinite: isChecked,
    }));
  };
  const handleChangeTimer = (value: string | null): void => {
    setEditTimerForm((prev: TEditTImer) => ({
      ...prev,
      remainingTime: value || '00:00',
    }));
  };

  const handleSubmit = (): void => {
    dispatch(editTimerThunk({ timerId: id, formData: editTimerForm }))
      .unwrap()
      .then((res): void => {
        if (res) {
          setChangeDialog(false);
        }
      })
      .catch((err): void => {
        if (err) {
          console.log(err);
        }
      });
  };

  const toggleChangeDialog = (): void => {
    setChangeDialog((prevState: boolean) => !prevState);
  };

  const isDisable: boolean =
    (Number(editTimerForm.price) === 0 && editTimerForm.remainingTime !== '00:00') ||
    (Number(editTimerForm.price) > 0 && !editTimerForm.isInfinite && editTimerForm.remainingTime === '00:00');

  const isInfiniteDisable: boolean = editTimerForm.isInfinite && Number(editTimerForm.price) === 0;

  const isLoading: boolean = editTimer.isLoading as boolean;

  const shouldDisableTime: boolean =
    (isActive && !isPaused) || (isActive && isPaused && isInfinite) || editTimerForm.isInfinite;

  return (
    <div className="laptop-hd-max:p-1 laptop-hd-min:w-full">
      <Dialog open={changeDialog} onOpenChange={setChangeDialog}>
        <EditButtonStyled icon={MdEdit} className="laptop-hd-max:hidden" handleClick={() => toggleChangeDialog()} />
        <DialogTrigger asChild>
          <span className={'laptop-hd-min:hidden'}>Փոփոխել</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Փոփոխել ժամանակացույցը</DialogTitle>
          </DialogHeader>
          <div className="my-5 flex items-center space-x-2">
            <div className="grid flex-1 gap-3">
              <div className="flex w-full items-center space-x-3">
                <InputWithLabel label="Ժամանակը" innerClassName="flex gap-3 items-center">
                  <TimePicker
                    value={editTimerForm.remainingTime}
                    name="remainingTime"
                    className="border-slate-20 w-full rounded-md border px-3 py-2"
                    minTime={isActive && defineTime && !isInfinite ? defineTime : '00:00'}
                    disabled={shouldDisableTime}
                    onChange={handleChangeTimer}
                    disableClock={true}
                  />
                  <div className="flex select-none flex-col items-center space-y-1">
                    <Checkbox
                      id="infinite"
                      className="h-3.5 w-3.5"
                      checked={(!isPaused && isActive) || (isActive && isInfinite) || editTimerForm.isInfinite}
                      disabled={isActive}
                      onCheckedChange={handleChangeCheckbox}
                    />
                    <label
                      htmlFor="infinite"
                      onClick={() => handleChangeCheckbox(!editTimerForm.isInfinite)}
                      className={cn('text-xs', isActive && 'opacity-50')}
                    >
                      ԱՆՈՐՈՇ
                    </label>
                  </div>
                </InputWithLabel>
              </div>
              <InputWithLabel
                name="price"
                label="ԳԻՆԸ"
                type="number"
                disabled={isActive && !isPaused}
                placeholder="0"
                min={0}
                handleChange={handleChange}
                value={editTimerForm.price}
              />
              <InputWithLabel
                name="waitingCount"
                label="Սպասողների քանակը"
                type="number"
                placeholder="0"
                handleChange={handleChange}
                value={editTimerForm.waitingCount}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <ButtonShadcnWithLoader
              text="Փոխել"
              isLoading={isLoading}
              disabled={isDisable || isInfiniteDisable}
              className="min-w-[79px] text-black"
              handleClick={async (): Promise<void> => handleSubmit()}
            />
            <DialogClose asChild>
              <Button type="button" variant="destructive">
                Փակել
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
});
EditControlTimer.displayName = 'EditControlTimer';

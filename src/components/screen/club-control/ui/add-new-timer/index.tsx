import { TNewTimerForm } from '@components/screen/club-control/types';
import { Button } from '@components/shadcn/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/shadcn/ui/dialog';
import { Input } from '@components/shadcn/ui/input';
import { ButtonLoading } from '@components/ui';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { createTimerThunk } from '@redux/http/club-control';
import React from 'react';

export const AddNewTimer = () => {
  const dispatch = useAppDispatch();
  const { club } = useAppSelector((state) => state.club);
  const { createTimer } = useAppSelector((state) => state.clubControl);

  const [newTimer, setNewTimer] = React.useState<TNewTimerForm>({
    title: '',
    club: '',
    author: '',
  });

  React.useEffect(() => {
    setNewTimer((prev) => ({
      ...prev,
      club: club?._id as string,
      author: club?.author._id as string,
    }));
  }, [club]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setNewTimer((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(createTimerThunk(newTimer));
  };

  const isLoading = createTimer.isLoading;

  return (
    <div className={'flex w-full justify-end'}>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Ավելացնել համակարգիչ</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ավելացնել համակարգիչ</DialogTitle>
          </DialogHeader>
          <div className="my-5 flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                type={'text'}
                value={newTimer.title}
                onChange={handleChange}
                placeholder={'Համակարգչի անվանումը'}
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" className="min-w-[99px]" variant="default" onClick={handleSubmit}>
                {isLoading ? <ButtonLoading /> : 'Ստեղծել'}
              </Button>
            </DialogClose>
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
};

import { IEditTimer, TEditFormData } from '@components/screen/settings/types';
import { Button } from '@components/shadcn/ui/button';
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/shadcn/ui/dialog';
import { Input } from '@components/shadcn/ui/input';
import { Label } from '@components/shadcn/ui/label';
import { ButtonShadcnWithLoader, DialogContentCorrect } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { updateTimerInfoThunk } from '@redux/http';
import { setOpenDialog } from '@redux/reducers';
import React, { FormEventHandler } from 'react';
import { FaEdit } from 'react-icons/fa';

export const EditTimer: React.FC<IEditTimer> = React.memo((props) => {
  const { _id, title, dialogKey } = props;

  const dispatch = useAppDispatch();
  const { updateInfoTimer } = useAppSelector((state) => state.timer);
  const { openDialogs } = useAppSelector((state) => state.dialog);
  const { user } = useAppSelector((state) => state.user);

  const defineDialogKey = dialogKey as string;
  const isOpen: boolean = openDialogs[defineDialogKey] || false;

  const [formData, setFormData] = React.useState<TEditFormData>({
    title: title || '',
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSetDialogOpen = (newOpenState: boolean): void => {
    dispatch(setOpenDialog({ key: defineDialogKey, isOpen: newOpenState }));
  };

  const enableButton = !formData.title || title === formData.title;
  const isLoading = updateInfoTimer.isLoading;

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    dispatch(updateTimerInfoThunk({ id: _id, userId: user?._id, body: formData }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleSetDialogOpen}>
      <DialogTrigger asChild>
        <button className="mr-4">
          <FaEdit size={25} />
        </button>
      </DialogTrigger>
      <DialogContentCorrect className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base">Փոփոխել ժամանակացույցը</DialogTitle>
          <DialogDescription>Լրացնել ստորև նշված դաշտ(եր)ը</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-3 space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className={'font-bold'}>
              Անվանում
            </Label>
            <Input type="text" name="title" value={formData.title} onChange={handleChange} />
          </div>
          <DialogFooter className="sm:justify-end">
            <ButtonShadcnWithLoader
              text="Փոխել"
              isLoading={isLoading as boolean}
              disabled={enableButton}
              className="min-w-[80px] text-black"
              type="submit"
            />

            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContentCorrect>
    </Dialog>
  );
});
EditTimer.displayName = 'EditTimer';

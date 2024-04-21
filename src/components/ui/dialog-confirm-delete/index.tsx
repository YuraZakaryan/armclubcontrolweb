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
import { Input } from '@components/shadcn/ui/input';
import { Label } from '@components/shadcn/ui/label';
import { ButtonShadcnWithLoader } from '@components/wrapper';
import { useAppSelector } from '@hooks/redux';
import { IDialogConfirmDelete } from '@types';
import React from 'react';
import { MdDelete } from 'react-icons/md';

export const ConfirmDeleteDialog: React.FC<IDialogConfirmDelete> = React.memo((props) => {
  const { _id, label, title, onChange, handleClick, confirmText } = props;
  const enableButton = confirmText !== title;

  const { deleteClub } = useAppSelector((state) => state.club);

  const isLoading = deleteClub.isLoading;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={'relative right-2'}>
          <MdDelete size={25} color="red" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className={'text-base'}>
            <span className={'capitalize'}>{label}</span>ի ջնջման հաստատում
          </DialogTitle>
          <DialogDescription>
            Կխնդրենք հաստատել ջնջման հարցումը, գրելով{' '}
            <span className={'font-bolder text-secondary underline'}>{title}</span> անունը ներքևի դաշտում
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input type="text" onChange={onChange} />
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <ButtonShadcnWithLoader
            disabled={enableButton}
            isLoading={isLoading as boolean}
            text="Հաստատել"
            handleClick={() => handleClick(_id)}
            className="min-w-[120px]"
          />
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Փակել
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
ConfirmDeleteDialog.displayName = 'ConfirmDeleteDialog';

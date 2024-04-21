import { IDeleteCommentButton } from '@components/screen/club/types';
import { Button } from '@components/shadcn/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@components/shadcn/ui/dialog';
import { ButtonLoading } from '@components/ui';
import { useAppSelector } from '@hooks/redux';
import cn from 'classnames';
import React, { PropsWithChildren } from 'react';

export const DeleteCommentButton: React.FC<PropsWithChildren<IDeleteCommentButton>> = React.memo((props) => {
  const { _id, deleteOneComment, checkAccess, children, deleteDialog, setDeleteDialog, className } = props;

  const { delete: deleteState } = useAppSelector((state) => state.comment);
  return (
    <React.Fragment>
      {checkAccess && (
        <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
          <DialogTrigger asChild>
            <button>
              <i className={cn('text-[12px] text-red-700', className)}>{children}</i>
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ջնջման հարցում</DialogTitle>
              <DialogDescription>Արդյո՞ք ցանկանում եք ջնջել մեկնաբանությունը</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant={'destructive'}
                onClick={() => deleteOneComment(_id)}
                className={'min-w-[115px] bg-red-800'}
              >
                {deleteState.isLoading ? <ButtonLoading /> : 'ԱՅՈ ՋՆՋԵԼ'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </React.Fragment>
  );
});
DeleteCommentButton.displayName = 'DeleteCommentButton';

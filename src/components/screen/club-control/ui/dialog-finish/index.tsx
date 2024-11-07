import { IDialogFinish } from '@components/screen/club-control/types';
import { Button } from '@components/shadcn/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/shadcn/ui/dialog';
import { SpecialWord } from '@components/wrapper';
import React from 'react';

export const DialogFinish: React.FC<IDialogFinish> = React.memo((props) => {
  const { openFinalDialog, setOpenFinalDialog, timer } = props;

  return (
    <Dialog open={openFinalDialog} onOpenChange={setOpenFinalDialog}>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className={'text-base leading-6'}>Վերջնական արդյունք</DialogTitle>
          <DialogDescription>
            <div className={'mt-2 flex w-full flex-col items-center gap-2'}>
              <section className={'text-secondary text-xl'}>
                Համակարգիչ -<SpecialWord>{timer?.title ? timer?.title : 'օր․ PS5 առաջին'}</SpecialWord>
              </section>
              <section className={'text-left'}>
                Ժամանակը։
                <SpecialWord>
                  {timer?.playedTime}
                  րոպե
                </SpecialWord>
              </section>
              <section>
                Հաճախորդը պետք է ձեզ տա։
                <SpecialWord>
                  {timer?.price}
                  &nbsp;դրամ
                </SpecialWord>
              </section>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className={'text-text hover:bg-gray-200'}>
              ՓԱԿԵԼ
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});
DialogFinish.displayName = 'DialogFinish';

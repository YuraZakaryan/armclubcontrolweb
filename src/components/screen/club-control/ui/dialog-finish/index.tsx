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
import { formattedPrice, minutesToTime, timeToMinutes } from '@utils';
import React from 'react';

export const DialogFinish: React.FC<IDialogFinish> = React.memo((props) => {
  const { openFinalDialog, setOpenFinalDialog, endedTimer } = props;

  const differenceDefineAndRemaining: number = endedTimer.defineTime
    ? timeToMinutes(endedTimer.defineTime) - timeToMinutes(endedTimer.remainingTime)
    : 0;

  const isManuallyStopped: string =
    endedTimer.manuallyStopped && endedTimer.defineTime
      ? minutesToTime(differenceDefineAndRemaining)
      : endedTimer.remainingTime;

  return (
    <Dialog open={openFinalDialog} onOpenChange={setOpenFinalDialog}>
      <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className={'text-base leading-6'}>Վերջնական արդյունք</DialogTitle>
          <DialogDescription>
            <div className={'mt-2 flex w-full flex-col items-center gap-2'}>
              <section className={'text-secondary text-xl'}>
                Համակարգիչ -<SpecialWord>{endedTimer?.title ? endedTimer?.title : 'օր․ PS5 առաջին'}</SpecialWord>
                <span className={'ml-1 text-black'}>[{endedTimer?._id ? endedTimer?.index : 'օր․ 1'}]</span>
              </section>
              <section className={'text-left'}>
                Ժամանակը։
                <SpecialWord>
                  {endedTimer?.remainingTime
                    ? endedTimer?.remainingTime != '00:00'
                      ? isManuallyStopped
                      : endedTimer?.defineTime
                    : 'օր․ 00:10'}{' '}
                  րոպե
                </SpecialWord>
              </section>
              <section>
                Հաճախորդը պետք է ձեզ տա։
                <SpecialWord>
                  {!endedTimer?.pricePerHour ? 'օր․ 500' : formattedPrice(Math.round(endedTimer?.pricePerHour))}
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

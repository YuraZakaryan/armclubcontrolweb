import type { IConditionsDialog } from '@components/screen/club/types';
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
import React from 'react';

export const ConditionsDialog: React.FC<IConditionsDialog> = React.memo((props) => {
  const { openConditionDialog, setOpenConditionDialog } = props;
  return (
    <Dialog open={openConditionDialog} onOpenChange={setOpenConditionDialog}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className={'mb-2'}>ՈՒշադրությու՝ն</DialogTitle>
          <DialogDescription>
            <span className={'text-red-800'}>Մեկնաբանություններում խստիվ ԱՐԳԵԼՎՈՒՄ Է․</span>
            <ol className={'ml-6 mt-2 flex list-disc flex-col gap-2'}>
              <li className={'text-left'}>
                Վիրավորել կայքի մյուս հաճախորդներին, նաև կայքի ադմինիստրացիային, ակումբի սեփականատիրոջը և աշխատողներին
                (նույիսկ ինքդ քեզ)
              </li>
              <li className={'text-left'}>
                Հայհոյանք ցանկացած տեսակի ( նկատի ունենք կրճատ գրելաձև, աստղանիկներ, կետեր և դրանց նման նշաններ )
              </li>
              <li>Հղումներ, գովազդներ</li>
            </ol>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
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
ConditionsDialog.displayName = 'ConditionsDialog';

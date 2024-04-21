import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@components/shadcn/ui/accordion';
import { CustomTable } from '@components/wrapper';
import { CustomTableCell, CustomTableHeaderItem, CustomTableRow } from '@components/wrapper/custom-table/wrapper';
import { TTimerHistories } from '@redux/types';
import { ITimerHistory } from '@types';
import { formattedPrice } from '@utils';
import React from 'react';

export const TimerHistory: React.FC<ITimerHistory> = React.memo((props) => {
  const { club, global } = props;
  const timerHistories: Array<TTimerHistories> = club?.timerHistories;
  const title: string = club?.title;

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>{!global ? 'Պատմություն' : title}</AccordionTrigger>
        <AccordionContent>
          <CustomTable
            caption={timerHistories && timerHistories.length === 0 ? 'Դուք դեռ չունեք ժամանակացույցի պատմություն' : ''}
            header={
              <React.Fragment>
                <CustomTableHeaderItem>ID</CustomTableHeaderItem>
                <CustomTableHeaderItem>Անվանումը</CustomTableHeaderItem>
                <CustomTableHeaderItem>Սկիզբ</CustomTableHeaderItem>
                <CustomTableHeaderItem>Ժամանակ</CustomTableHeaderItem>
                <CustomTableHeaderItem>Վերջնաժամկետ</CustomTableHeaderItem>
                <CustomTableHeaderItem>Ժամը</CustomTableHeaderItem>
                <CustomTableHeaderItem>Վերջնական գումարը</CustomTableHeaderItem>
              </React.Fragment>
            }
            body={
              Array.isArray(timerHistories) &&
              timerHistories.map((timer: TTimerHistories, index: number) => (
                <CustomTableRow key={timer._id}>
                  <CustomTableCell>{index + 1}</CustomTableCell>
                  <CustomTableCell>{timer.title}</CustomTableCell>
                  <CustomTableCell>{timer.start.slice(0, 5)}</CustomTableCell>
                  <CustomTableCell>{timer.time}</CustomTableCell>
                  <CustomTableCell>{timer.end.slice(0, 5)}</CustomTableCell>
                  <CustomTableCell>{formattedPrice(timer.price)} դրամ</CustomTableCell>
                  <CustomTableCell>{Math.round(timer.finalPrice)} դրամ</CustomTableCell>
                </CustomTableRow>
              ))
            }
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
});
TimerHistory.displayName = 'TimerHistory';

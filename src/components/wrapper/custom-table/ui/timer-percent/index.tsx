import { Progress } from '@components/shadcn/ui/progress';
import type { ITimerPercent } from '@components/wrapper/custom-table/types';
import { calculatePercentTimer } from '@utils/club'
import React from 'react';

export const TimerPercent: React.FC<ITimerPercent> = React.memo((props) => {
  const { remainingTime, defineTime, isInfinite, isActive } = props;

  return (
    <>
      {isActive ? (
        <div className={'relative flex h-8 items-center justify-center'}>
          <span className={'absolute z-10'}>
            {isInfinite || (!remainingTime && isActive)
              ? 'Չվորոշված'
              : `${calculatePercentTimer(defineTime, remainingTime)}%`}
          </span>
          <Progress
            value={isInfinite || (!defineTime && isActive) ? 100 : calculatePercentTimer(defineTime, remainingTime)}
            className={'h-full rounded border'}
          />
        </div>
      ) : (
        <p>Համակարգիչը ազատ է</p>
      )}
    </>
  );
});
TimerPercent.displayName = 'TimerPercent';

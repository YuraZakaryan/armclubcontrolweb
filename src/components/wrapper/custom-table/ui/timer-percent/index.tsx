import { Progress } from '@components/shadcn/ui/progress';
import { calculatePercentTimer } from '@utils/club';
import React, { useEffect, useState } from 'react';
import { ITimerPercent } from '../../types';

export const TimerPercent: React.FC<ITimerPercent> = React.memo((props) => {
  const { start, end, isInfinite, isActive, isPause, pausePeriods, timerId, onTimeUp } = props;
  const [percentage, setPercentage] = useState<number>(0);

  useEffect(() => {
    if (isActive && start && end) {
      const percent = calculatePercentTimer(start, end, pausePeriods || []);
      setPercentage(percent);
    } else {
      setPercentage(0);
    }
  }, [isActive, start, end, pausePeriods, isPause]);

  useEffect(() => {
    // Вызов функции при завершении таймера
    if (percentage === 100) {
      onTimeUp(timerId);
    }
  }, [percentage, onTimeUp, timerId]);

  return (
    <>
      {isActive ? (
        <div className={'relative flex h-8 items-center justify-center'}>
          <span className={'absolute z-10'}>
            {isPause ? 'Ժամանակաչափը կանգեցված է' : isInfinite ? 'Չվորոշված' : `${percentage}%`}
          </span>
          <Progress value={percentage} className={'h-full rounded border'} />
        </div>
      ) : (
        <p>Համակարգիչը ազատ է</p>
      )}
    </>
  );
});

TimerPercent.displayName = 'TimerPercent';

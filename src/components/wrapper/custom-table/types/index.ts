import { TPausePeriod } from '@redux/types';
import { TClassName } from '@types';
import { PropsWithChildren } from 'react';

export interface ICustomTableRow extends PropsWithChildren, TClassName {
  handleClick?: () => void;
  isLoading?: boolean;
}
export interface ITimerPercent {
  timerId: string;
  isActive: boolean;
  isInfinite: boolean;
  isPause: boolean;
  start: string;
  end: string;
  onTimeUp: (timerId: string) => void;
  pausePeriods: TPausePeriod[];
}

export interface ITimeRemaining {
  start: string;
  end: string;
  isActive: boolean;
  isInfinite: boolean;
  isPause: boolean;
}

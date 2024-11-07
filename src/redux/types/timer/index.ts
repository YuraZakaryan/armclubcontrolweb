import type { TClub, TItemsWithTotalLength, TRequestStatus } from '@redux/types';

export interface TTimer {
  _id: string;
  index?: number;
  title: string;
  remainingTime: string;
  defineTime: string;
  isInfinite: boolean;
  start: string;
  end: string;
  isActive: boolean;
  paused: boolean;
  price: number | null;
  waitingCount: number | null;
  manuallyStopped: boolean;
  pausePeriods: TPausePeriod[];
  club: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export type TPausePeriod = {
  start: string;
  end: string | null;
};

export type TFinishedTimer = {
  title: string;
  playedTime: string;
  price: number;
  pausePeriods: TPausePeriod[];
  _id: string;
};

export type TTimerHistories = {
  _id: string;
  title: string;
  time: string;
  start: string;
  end: string;
  price: number;
  finalPrice: number;
  isInfinite: boolean;
  manuallyStopped: boolean;
  club: TClub;
};
export type TTimerInitialState = {
  timerEditDialog: boolean;
  timers: TItemsWithTotalLength<TTimer[]>;
  startTimer: TRequestStatus;
  editTimer: TRequestStatus;
  updateInfoTimer: TRequestStatus;
  stopTimer: TRequestStatus;
  togglePauseTimer: TRequestStatus;
};
export type TTimerThunkUpdate<T> = {
  timerId: string;
  formData: T;
};
export type TTogglePauseTimerRequestBody = {
  timerId: string;
  currentStartTime: string;
};

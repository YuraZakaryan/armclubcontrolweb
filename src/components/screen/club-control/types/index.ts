import { TTimer } from '@redux/types';

export interface IControlTimer {
  clubId: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}
export interface IControlNotify {
  endedTimer: TTimer;
}
export type TNewTimerForm = {
  title: string;
  club: string;
  author: string;
};
export interface ITimerEditButtons {
  timerId: string;
  isActive: boolean;
  paused: boolean;
  isInfinite: boolean;
  isPaused: boolean;
  defineTime: string;
  remainingTime: string;
  price: number | null;
  waitingCount: number | null;
}
export type TEditTImer = {
  remainingTime: string;
  price: number;
  waitingCount: number;
  isInfinite: boolean;
};
export interface IEditRow {
  id: string;
  isActive?: boolean;
  isInfinite?: boolean;
  isPaused?: boolean;
  price?: number | null;
  waitingCount?: number | null;
  defineTime?: string;
  setChangeDialog: React.Dispatch<React.SetStateAction<boolean>>;
  changeDialog: boolean;
}
export interface IDialogStop {
  id: string;
}
export interface IDialogFinish {
  openFinalDialog: boolean;
  setOpenFinalDialog: React.Dispatch<React.SetStateAction<boolean>>;
  endedTimer: TTimer;
};
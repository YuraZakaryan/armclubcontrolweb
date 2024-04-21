export type TInitialDialogState = {
  openDialogs: Record<string, boolean>;
  editTimerDialog: boolean;
};
export type TRequestIds = {
  timerId?: string;
  clubId?: string;
  userId?: string;
};
import { TInitialDialogState } from '@redux/types/dialog';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TInitialDialogState = {
  openDialogs: {},
  editTimerDialog: false,
};

export const index = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setOpenDialog: (state: TInitialDialogState, action: PayloadAction<{ key: string; isOpen: boolean }>) => {
      const { key, isOpen } = action.payload;
      state.openDialogs[key] = isOpen;
    },
    clearOpenDialog(state: TInitialDialogState) {
      state.openDialogs = initialState.openDialogs;
    },
    setEditTimerDialog: (state: TInitialDialogState, action: PayloadAction<boolean>) => {
      state.editTimerDialog = action.payload;
    },
  },
});
export const dialogReducer = index.reducer;
export const { setOpenDialog, clearOpenDialog, setEditTimerDialog } = index.actions;

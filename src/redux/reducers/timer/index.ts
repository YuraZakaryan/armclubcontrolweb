import {
  editTimerThunk,
  startTimerThunk,
  stopTimerThunk,
  togglePauseTimerThunk,
  updateTimerInfoThunk,
} from '@redux/http';
import { TTimerInitialState } from '@redux/types';
import { createSlice } from '@reduxjs/toolkit';
import { notifySuccess } from '@utils/notify';

const initialState: TTimerInitialState = {
  timerEditDialog: false,
  timers: {
    isLoading: false,
    isError: false,
    totalItems: 0,
    items: [],
  },
  startTimer: {
    isError: false,
    isLoading: null,
  },
  editTimer: {
    isError: false,
    isLoading: null,
  },
  stopTimer: {
    isError: false,
    isLoading: null,
  },
  togglePauseTimer: {
    isError: false,
    isLoading: null,
  },
  updateInfoTimer: {
    isError: false,
    isLoading: null,
  },
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    toggleTimerEditDialog: (state: TTimerInitialState): void => {
      state.timerEditDialog = !state.timerEditDialog;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startTimerThunk.fulfilled, (state: TTimerInitialState): void => {
        state.startTimer = initialState.editTimer;
      })
      .addCase(startTimerThunk.pending, (state: TTimerInitialState): void => {
        state.startTimer = {
          isLoading: true,
          isError: false,
        };
      })
      .addCase(startTimerThunk.rejected, (state: TTimerInitialState): void => {
        state.startTimer = {
          isLoading: false,
          isError: true,
        };
      })
      .addCase(editTimerThunk.fulfilled, (state: TTimerInitialState): void => {
        state.editTimer = initialState.editTimer;
      })
      .addCase(editTimerThunk.pending, (state: TTimerInitialState): void => {
        state.editTimer = {
          isLoading: true,
          isError: false,
        };
      })
      .addCase(editTimerThunk.rejected, (state: TTimerInitialState): void => {
        state.editTimer = {
          isLoading: false,
          isError: true,
        };
      })
      .addCase(stopTimerThunk.fulfilled, (state: TTimerInitialState): void => {
        state.stopTimer = initialState.editTimer;
        state.timerEditDialog = false;
      })
      .addCase(stopTimerThunk.pending, (state: TTimerInitialState): void => {
        state.stopTimer = {
          isLoading: true,
          isError: false,
        };
      })
      .addCase(stopTimerThunk.rejected, (state: TTimerInitialState): void => {
        state.stopTimer = {
          isLoading: false,
          isError: true,
        };
      })
      .addCase(togglePauseTimerThunk.fulfilled, (state: TTimerInitialState): void => {
        state.togglePauseTimer = initialState.editTimer;
      })
      .addCase(togglePauseTimerThunk.pending, (state: TTimerInitialState): void => {
        state.togglePauseTimer = {
          isLoading: true,
          isError: false,
        };
      })
      .addCase(togglePauseTimerThunk.rejected, (state: TTimerInitialState): void => {
        state.togglePauseTimer = {
          isLoading: false,
          isError: true,
        };
      })
      .addCase(updateTimerInfoThunk.fulfilled, (state: TTimerInitialState): void => {
        state.updateInfoTimer = initialState.updateInfoTimer;
        notifySuccess('Ժամանակաչափը հաջողությամբ թարմացվեց!');
      })
      .addCase(updateTimerInfoThunk.pending, (state: TTimerInitialState): void => {
        state.updateInfoTimer = {
          isLoading: true,
          isError: false,
        };
      })
      .addCase(updateTimerInfoThunk.rejected, (state: TTimerInitialState): void => {
        state.updateInfoTimer = {
          isLoading: false,
          isError: true,
        };
      });
  },
});
export const timerReducer = timerSlice.reducer;
export const { toggleTimerEditDialog } = timerSlice.actions;

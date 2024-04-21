import { createTimerThunk } from '@redux/http/club-control';
import { TInitialClubControlState } from '@redux/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TInitialClubControlState = {
  createTimer: {
    isLoading: false,
    isError: false,
  },
};

const clubControlSlice = createSlice({
  name: 'club-control',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTimerThunk.fulfilled, (state: TInitialClubControlState) => {
        state.createTimer = initialState.createTimer;
      })
      .addCase(createTimerThunk.pending, (state: TInitialClubControlState) => {
        state.createTimer = {
          isLoading: true,
          isError: false,
        };
      })
      .addCase(createTimerThunk.rejected, (state: TInitialClubControlState) => {
        state.createTimer = {
          isLoading: false,
          isError: true,
        };
      });
  },
});
export const clubControlReducer = clubControlSlice.reducer;

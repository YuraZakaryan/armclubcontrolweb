import { myClubsCreateThunk, myClubsEditThunk, myClubsFetchThunk } from '@redux/http';
import { TClub, TMyClubsInitialState } from '@redux/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notifySuccess } from '@utils/notify';

const initialState: TMyClubsInitialState = {
  items: [],
  fetch: {
    isLoading: null,
    isError: null,
  },
  create: {
    isLoading: null,
    isError: null,
  },
  edit: {
    isLoading: null,
    isError: null,
  },
};

export const myClubsSlice = createSlice({
  name: 'my-clubs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(myClubsFetchThunk.fulfilled, (state: TMyClubsInitialState, action: PayloadAction<TClub[]>): void => {
        state.items = action.payload;
        state.fetch.isLoading = false;
        state.fetch.isError = false;
      })
      .addCase(myClubsFetchThunk.pending, (state: TMyClubsInitialState): void => {
        state.fetch.isLoading = true;
        state.fetch.isError = false;
      })
      .addCase(myClubsFetchThunk.rejected, (state: TMyClubsInitialState): void => {
        state.items = [];
        state.fetch.isLoading = false;
        state.fetch.isError = true;
      })
      .addCase(myClubsCreateThunk.fulfilled, (state: TMyClubsInitialState, action: PayloadAction<TClub>): void => {
        state.items.push(action.payload);
        notifySuccess('Ակումբը հաջողությամբ ստեղծվեց!');
        state.create.isError = false;
        state.create.isLoading = false;
      })
      .addCase(myClubsCreateThunk.pending, (state: TMyClubsInitialState): void => {
        state.create.isLoading = true;
        state.create.isError = false;
      })
      .addCase(myClubsCreateThunk.rejected, (state: TMyClubsInitialState): void => {
        state.create.isError = true;
        state.create.isLoading = false;
      })
      .addCase(myClubsEditThunk.fulfilled, (state: TMyClubsInitialState, action: PayloadAction<TClub>): void => {
        state.items.push(action.payload);
        notifySuccess('Ակումբը հաջողությամբ թարմացվեց!');
        state.edit.isError = false;
        state.edit.isLoading = false;
      })
      .addCase(myClubsEditThunk.pending, (state: TMyClubsInitialState): void => {
        state.edit.isLoading = true;
        state.edit.isError = false;
      })
      .addCase(myClubsEditThunk.rejected, (state: TMyClubsInitialState): void => {
        state.edit.isError = true;
        state.edit.isLoading = false;
      });
  },
});
export const myClubsReducer = myClubsSlice.reducer;

import { $authHost } from '@redux/http';
import { clearOpenDialog } from '@redux/reducers';
import { TClub, TClubEdit } from '@redux/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleAxiosError } from '@utils/request-error-handler';
import { AxiosError } from 'axios';

export const myClubsFetchThunk = createAsyncThunk('fetch/myClub', async (userId: string, { rejectWithValue }) => {
  try {
    const { data } = await $authHost.get<TClub[]>(`/club/user/${userId}`);
    return data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(handleAxiosError(error));
  }
});

export const myClubsEditThunk = createAsyncThunk(
  'edit/myClub',
  async ({ formData, clubId, userId }: TClubEdit, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await $authHost.put<TClub>(`/club/${clubId}`, formData);
      dispatch(clearOpenDialog());
      dispatch(myClubsFetchThunk(userId));
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);
export const myClubsCreateThunk = createAsyncThunk(
  'create/myClub',
  async ({ formData, userId }: TClubEdit, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await $authHost.post<TClub>(`/club/create`, formData);
      dispatch(clearOpenDialog());
      dispatch(myClubsFetchThunk(userId));
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

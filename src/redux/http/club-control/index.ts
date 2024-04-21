import { TNewTimerForm } from '@components/screen/club-control/types';
import { $authHost } from '@redux/http';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleAxiosError } from '@utils/request-error-handler';
import { AxiosError } from 'axios';

export const createTimerThunk = createAsyncThunk('fetch/clubs', async (body: TNewTimerForm, { rejectWithValue }) => {
  try {
    const { data } = await $authHost.post('club/timer', body);
    return data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(handleAxiosError(error));
  }
});

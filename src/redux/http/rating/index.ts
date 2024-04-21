import { $authHost } from '@redux/http';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TRatingValue } from '@types';
import { handleAxiosError } from '@utils/request-error-handler';
import { AxiosError } from 'axios';

export const setRatingThunk = createAsyncThunk('set/rating', async (ratingValue: TRatingValue, { rejectWithValue }) => {
  try {
    const { data } = await $authHost.post('rating', ratingValue);
    return data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(handleAxiosError(error));
  }
});

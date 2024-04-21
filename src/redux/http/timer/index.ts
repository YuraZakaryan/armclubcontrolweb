import { TEditTImer } from '@components/screen/club-control/types';
import { TEditFormData } from '@components/screen/settings/types';
import { $authHost, myClubsFetchThunk } from '@redux/http';
import { clearOpenDialog } from '@redux/reducers';
import { IRequestBody, TTimer, TTimerThunkUpdate, TTogglePauseTimerRequestBody } from '@redux/types';
import { TRequestIds } from '@redux/types/dialog'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '@utils/constants';
import { handleAxiosError } from '@utils/request-error-handler';
import { AxiosError } from 'axios';
import { io, Socket } from 'socket.io-client';

const createSocket = (clubId: string): Socket => {
  return io(API_URL, {
    query: {
      club: clubId,
    },
  });
};

export const timerThunk = createAsyncThunk('timer/updateTimers', async (clubId: string, { rejectWithValue }) => {
  const socket = createSocket(clubId);

  return new Promise<TTimer[]>((resolve, reject) => {
    socket.on('timer-updated', (timersData: TTimer[]) => {
      try {
        const parsedData = JSON.parse(String(timersData));
        resolve(parsedData);
      } catch (error) {
        reject(rejectWithValue(error));
      }
    });

    return () => {
      socket.off('timer-updated');
      socket.disconnect();
    };
  });
});

export const editTimerThunk = createAsyncThunk(
  'edit/timer',
  async ({ timerId, formData }: TTimerThunkUpdate<TEditTImer>, { rejectWithValue }) => {
    formData = {
      ...formData,
      price: Number(formData.price),
    };

    try {
      const { data } = await $authHost.put(`/club/timer/${timerId}`, formData);
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);
export const stopTimerThunk = createAsyncThunk('stop/timer', async (timerId: string, { rejectWithValue }) => {
  try {
    const { data } = await $authHost.put(`/club/timer/stop/${timerId}`);
    return data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(handleAxiosError(error));
  }
});
export const togglePauseTimerThunk = createAsyncThunk(
  'pauseOrPlay/timer',
  async ({ timerId, currentStartTime }: TTogglePauseTimerRequestBody, { rejectWithValue }) => {
    try {
      const { data } = await $authHost.put(`/club/timer/pause/${timerId}`, {
        start: currentStartTime,
      });
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);
export const startTimerThunk = createAsyncThunk(
  'start/timer',
  async ({ timerId, currentStartTime }: TTogglePauseTimerRequestBody, { rejectWithValue }) => {
    try {
      const { data } = await $authHost.put(`/club/timer/start/${timerId}`, {
        start: currentStartTime,
      });
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);
export const deleteTimerThunk = createAsyncThunk('delete/timer', async ({timerId, userId}: TRequestIds, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await $authHost.delete(`club/timer/${timerId}`);
    if (userId) {
      dispatch(myClubsFetchThunk(userId));
    }
    return data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(handleAxiosError(error));
  }
});
export const updateTimerInfoThunk = createAsyncThunk(
  'updateInfo/timer',
  async ({ id, userId, body }: IRequestBody<TEditFormData>, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await $authHost.put(`club/timer/info/${id}`, body);
      dispatch(clearOpenDialog());
      if (userId) {
        dispatch(myClubsFetchThunk(userId));
      }
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

import { $authHost, meThunk, myClubsFetchThunk } from '@redux/http';
import { IFetchClubsParams, TClub, TFetchParams, TLocationReq } from '@redux/types';
import { TRequestIds } from '@redux/types/dialog';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleAxiosError } from '@utils/request-error-handler';
import axios, { AxiosError } from 'axios';

export const fetchClubsThunk = createAsyncThunk(
  'fetch/clubs',
  async ({ skip, limit, region, city, random, byRating }: IFetchClubsParams, { rejectWithValue }) => {
    try {
      let url: string = 'club/all?';

      if (skip !== undefined) {
        url += `&skip=${skip}&`;
      }

      if (limit !== undefined) {
        url += `limit=${limit}&`;
      }

      if (region !== undefined) {
        url += `region=${region}&`;
      }

      if (city !== undefined) {
        url += `city=${city}&`;
      }

      if (random !== undefined) {
        url += `random=${true}&`;
      }

      if (byRating !== undefined) {
        url += `byRating=${true}&`;
      }

      if (url.endsWith('&')) {
        url = url.slice(0, -1);
      }
      const { data } = await $authHost.get(url);
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const searchClubsThunk = createAsyncThunk(
  'search/clubs',
  async ({ skip, limit, title }: IFetchClubsParams, { rejectWithValue }) => {
    try {
      let url: string = 'club/all?';

      if (skip !== undefined) {
        url += `&skip=${skip}&`;
      }

      if (limit !== undefined) {
        url += `limit=${limit}&`;
      }

      if (title !== undefined) {
        url += `title=${title}&`;
      }

      if (url.endsWith('&')) {
        url = url.slice(0, -1);
      }

      const { data } = await $authHost.get(url);
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const fetchTopRatedClubsThunk = createAsyncThunk(
  'fetch-top-rated/clubs',
  async ({ skip, limit, byRating }: IFetchClubsParams, { rejectWithValue }) => {
    try {
      let url: string = 'club/all?';

      if (skip !== undefined) {
        url += `&skip=${skip}&`;
      }

      if (limit !== undefined) {
        url += `limit=${limit}&`;
      }

      if (byRating !== undefined) {
        url += `byRating=${true}&`;
      }

      if (url.endsWith('&')) {
        url = url.slice(0, -1);
      }

      const { data } = await $authHost.get(url);
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const fetchByTimerClubsThunk = createAsyncThunk(
  'fetch-by-timer/clubs',
  async ({ skip, limit, sortByTimers }: IFetchClubsParams, { rejectWithValue }) => {
    try {
      let url: string = 'club/all?';

      if (skip !== undefined) {
        url += `&skip=${skip}&`;
      }

      if (limit !== undefined) {
        url += `limit=${limit}&`;
      }

      if (sortByTimers !== undefined) {
        url += `sortByTimers=${true}&`;
      }

      if (url.endsWith('&')) {
        url = url.slice(0, -1);
      }

      const { data } = await $authHost.get(url);
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const fetchByRegionClubsThunk = createAsyncThunk(
  'fetch-by-region/clubs',
  async ({ skip, limit, region, city }: IFetchClubsParams, { rejectWithValue }) => {
    try {
      let url: string = 'club/all?';

      if (skip !== undefined) {
        url += `&skip=${skip}&`;
      }

      if (limit !== undefined) {
        url += `limit=${limit}&`;
      }

      if (region && region !== 'yerevan') {
        url += `region=${region}&`;
      }

      if (city) {
        url += `city=${city}&`;
      }

      if (url.endsWith('&')) {
        url = url.slice(0, -1);
      }

      const { data } = await $authHost.get(url);
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const fetchClubThunk = createAsyncThunk('fetch/club', async (clubId: string, { rejectWithValue }) => {
  try {
    const { data } = await $authHost.get<TClub>(`club/${clubId}`);
    return data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(handleAxiosError(error));
  }
});
export const addClubToHistoryThunk = createAsyncThunk('add/history', async (clubId: string, { rejectWithValue }) => {
  try {
    const { data } = await $authHost.post(`/favourite-history-club/history-club/manage/${clubId}`);
    return data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(handleAxiosError(error));
  }
});
export const viewClubThunk = createAsyncThunk('view/club', async (clubId: string, { rejectWithValue }) => {
  try {
    const { data } = await $authHost.put(`club/view/${clubId}`);
    return data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(handleAxiosError(error));
  }
});
export const toggleClubFavoriteThunk = createAsyncThunk(
  'toggleFavorite/club',
  async (clubId: string, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await $authHost.post(`favourite-history-club/favourite/manage/${clubId}`);
      dispatch(meThunk());
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const fetchClubHistoryThunk = createAsyncThunk(
  'fetch/history',
  async ({ skip, limit }: TFetchParams, { rejectWithValue }) => {
    try {
      let url: string = '/favourite-history-club/history-club?';

      if (skip !== undefined) {
        url += `skip=${skip}&`;
      }

      if (limit !== undefined) {
        url += `limit=${limit}&`;
      }

      if (url.endsWith('&')) {
        url = url.slice(0, -1);
      }

      const { data } = await $authHost.get(url);
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);
export const fetchFavoriteClubsThunk = createAsyncThunk(
  'fetch/favorite-clubs',
  async ({ skip, limit }: TFetchParams, { rejectWithValue }) => {
    try {
      let url: string = '/favourite-history-club/favourite?';

      if (skip !== undefined) {
        url += `skip=${skip}&`;
      }

      if (limit !== undefined) {
        url += `limit=${limit}&`;
      }

      if (url.endsWith('&')) {
        url = url.slice(0, -1);
      }

      const { data } = await $authHost.get(url);
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const deleteClubThunk = createAsyncThunk(
  'delete/club',
  async ({ clubId, userId }: TRequestIds, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await $authHost.delete(`club/${clubId}`);
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

export const getLocationByYandex = createAsyncThunk(
  'get/location',
  async ({ latitude, longitude }: TLocationReq, { rejectWithValue }) => {
    try {
      const KEY = 'e8935908-16f0-4d92-a4e2-c204355f06f8';
      const { data } = await axios.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${KEY}&format=json&lang=en_RU&geocode=${longitude},${latitude}`,
      );
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

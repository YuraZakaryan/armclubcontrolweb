import type { TProfileChangePasswordFormData, TProfileGeneralFormData } from '@components/screen/profile/types';
import { $authHost } from '@redux/http';
import { IUpdateProfileThunk, TConfirmEmail, TResponseUser, TSendToEmail, TUser } from '@redux/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { SecureStoreService } from '@services';
import { handleAxiosError } from '@utils/request-error-handler';
import type { AxiosError } from 'axios';
import { FormikValues } from 'formik';

export const sendOtpToEmailThunk = createAsyncThunk(
  'send/otp',
  async ({ email, userId }: TSendToEmail, { rejectWithValue }) => {
    try {
      const { data } = await $authHost.post(`user/mail/otp/${userId}`, { email });
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const confirmAccountThunk = createAsyncThunk(
  'confirm/otp',
  async ({ email, userId, code }: TConfirmEmail, { rejectWithValue }) => {
    try {
      const { data } = await $authHost.put(`user/activation/${userId}`, {
        email,
        code,
      });
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);
export const loginThunk = createAsyncThunk('login/auth', async (formData: FormikValues, { rejectWithValue }) => {
  try {
    const { data } = await $authHost.post<TResponseUser>('auth/login', formData);
    SecureStoreService.saveAccessToken(data.tokens.access_token);
    SecureStoreService.saveRefreshToken(data.tokens.refresh_token);
    return data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(handleAxiosError(error));
  }
});
export const registrationThunk = createAsyncThunk(
  'registration/auth',
  async (formData: FormikValues, { rejectWithValue }) => {
    try {
      const { data } = await $authHost.post<TResponseUser>('auth/registration', { ...formData, role: 'USER' });
      SecureStoreService.saveAccessToken(data.tokens.access_token);
      SecureStoreService.saveRefreshToken(data.tokens.refresh_token);
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error, true));
    }
  },
);
export const meThunk = createAsyncThunk('me/auth', async (_: void, { rejectWithValue }) => {
  try {
    const { data } = await $authHost.get<TUser>('auth/me');
    return data;
  } catch (err) {
    const error = err as AxiosError;
    return rejectWithValue(handleAxiosError(error));
  }
});
export const updateProfileThunk = createAsyncThunk(
  'update/profile',
  async ({ userId, formData }: IUpdateProfileThunk<TProfileGeneralFormData>, { rejectWithValue }) => {
    try {
      const { data } = await $authHost.put(`/user/update/${userId}`, formData);
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);
export const changePasswordProfileThunk = createAsyncThunk(
  'change/profile-password',
  async ({ userId, formData }: IUpdateProfileThunk<TProfileChangePasswordFormData>, { rejectWithValue }) => {
    try {
      const { data } = await $authHost.put(`/user/update/password/${userId}`, formData);
      return data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

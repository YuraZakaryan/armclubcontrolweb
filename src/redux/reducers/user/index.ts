import {
  changePasswordProfileThunk,
  confirmAccountThunk,
  loginThunk,
  meThunk,
  registrationThunk,
  sendOtpToEmailThunk,
  updateProfileThunk,
} from '@redux/http';
import { TInitialUserState, TResponseBody } from '@redux/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { SecureStoreService } from '@services/secure-store';
import { notifySuccess } from '@utils/notify';

const initialState: TInitialUserState = {
  user: null,
  login: {
    isLoading: false,
    isError: false,
  },
  registration: {
    isLoading: false,
    isError: false,
    isErrorMessage: '',
  },
  me: {
    isLoading: null,
    isError: false,
  },
  updateProfile: {
    isLoading: false,
    isError: false,
  },
  changeProfilePassword: {
    isLoading: false,
    isError: false,
  },
  sendOtpToEmail: {
    isLoading: false,
    isError: false,
  },
  confirmAccount: {
    isLoading: false,
    isError: false,
  },
  sideBar: {
    isOpen: false,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleSideBar: (state: TInitialUserState) => {
      state.sideBar.isOpen = !state.sideBar.isOpen;
    },
    setSideBar: (state: TInitialUserState, action: PayloadAction<boolean>) => {
      state.sideBar = {
        isOpen: action.payload,
      };
    },
    clearRegistrationErrorText: (state: TInitialUserState) => {
      state.registration.isErrorMessage = '';
    },
    logOut: (state: TInitialUserState) => {
      state.user = null;
      SecureStoreService.deleteAccessToken();
      SecureStoreService.deleteRefreshToken();
    },
  },
  extraReducers: (builder): void => {
    builder
      .addCase(registrationThunk.fulfilled, (state: TInitialUserState, action) => {
        const { user } = action.payload;
        state.registration = {
          isLoading: false,
          isError: true,
          isErrorMessage: '',
        };
        state.user = user;
      })
      .addCase(registrationThunk.pending, (state: TInitialUserState) => {
        state.registration = {
          isLoading: true,
          isError: false,
          isErrorMessage: '',
        };
      })
      .addCase(registrationThunk.rejected, (state: TInitialUserState, action) => {
        const error = action.payload as TResponseBody;
        state.registration = {
          isLoading: false,
          isError: true,
          isErrorMessage: error.message,
        };
      })
      .addCase(loginThunk.fulfilled, (state: TInitialUserState, action) => {
        const { user } = action.payload;
        state.login = {
          isLoading: false,
          isError: true,
        };
        state.user = user;
      })
      .addCase(loginThunk.pending, (state: TInitialUserState) => {
        state.login = {
          isLoading: true,
          isError: false,
        };
      })
      .addCase(loginThunk.rejected, (state: TInitialUserState) => {
        state.login = {
          isLoading: false,
          isError: true,
        };
      })
      .addCase(meThunk.fulfilled, (state: TInitialUserState, action) => {
        state.user = action.payload;
        state.me = {
          isLoading: false,
          isError: false,
        };
      })
      .addCase(meThunk.pending, (state: TInitialUserState) => {
        state.me = {
          isLoading: true,
          isError: false,
        };
      })
      .addCase(meThunk.rejected, (state: TInitialUserState) => {
        state.user = null;
        state.me = {
          isLoading: false,
          isError: true,
        };
        SecureStoreService.deleteAccessToken();
        SecureStoreService.deleteRefreshToken();
      })
      .addCase(updateProfileThunk.fulfilled, (state: TInitialUserState): void => {
        state.updateProfile = initialState.updateProfile;
      })
      .addCase(updateProfileThunk.pending, (state: TInitialUserState): void => {
        state.updateProfile = {
          isError: false,
          isLoading: true,
        };
      })
      .addCase(updateProfileThunk.rejected, (state: TInitialUserState): void => {
        state.updateProfile = {
          isError: true,
          isLoading: false,
        };
      })
      .addCase(changePasswordProfileThunk.fulfilled, (state: TInitialUserState): void => {
        state.changeProfilePassword = initialState.changeProfilePassword;
      })
      .addCase(changePasswordProfileThunk.pending, (state: TInitialUserState): void => {
        state.changeProfilePassword = {
          isError: false,
          isLoading: true,
        };
      })
      .addCase(changePasswordProfileThunk.rejected, (state: TInitialUserState): void => {
        state.changeProfilePassword = {
          isError: true,
          isLoading: false,
        };
      })
      .addCase(sendOtpToEmailThunk.fulfilled, (state: TInitialUserState): void => {
        state.sendOtpToEmail = initialState.sendOtpToEmail;
        state.confirmAccount.isError = false;
      })
      .addCase(sendOtpToEmailThunk.pending, (state: TInitialUserState): void => {
        state.sendOtpToEmail = {
          isError: false,
          isLoading: true,
        };
      })
      .addCase(sendOtpToEmailThunk.rejected, (state: TInitialUserState): void => {
        state.sendOtpToEmail = {
          isError: true,
          isLoading: false,
        };
      })
      .addCase(confirmAccountThunk.fulfilled, (state: TInitialUserState): void => {
        state.confirmAccount = initialState.confirmAccount;
        notifySuccess('Ձեր էջը հաջողությամբ հաստատվեց');
      })
      .addCase(confirmAccountThunk.pending, (state: TInitialUserState): void => {
        state.confirmAccount = {
          isError: false,
          isLoading: true,
        };
      })
      .addCase(confirmAccountThunk.rejected, (state: TInitialUserState): void => {
        state.confirmAccount = {
          isError: true,
          isLoading: false,
        };
      });
  },
});
export const userReducer = userSlice.reducer;
export const { toggleSideBar, setSideBar, clearRegistrationErrorText, logOut } = userSlice.actions;

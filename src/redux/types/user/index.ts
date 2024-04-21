import type { TClub, TRequestStatus } from '@redux/types';

export type IUpdateProfileThunk<T> = {
  userId: string;
  formData: T;
};

export type TSideBarState = {
  isOpen: boolean;
};

export type TInitialUserState = {
  user: TUser | null;
  me: TRequestStatus;
  login: TRequestStatus;
  registration: TRequestStatus;
  updateProfile: TRequestStatus;
  changeProfilePassword: TRequestStatus;
  sendOtpToEmail: TRequestStatus;
  confirmAccount: TRequestStatus;
  sideBar: TSideBarState;
};

export type TUser = {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  username: string;
  age: number;
  role: string;
  clubs: Array<TClub>;
  favourites: string[];
  activated: boolean;
};
export type TTokens = {
  access_token: string;
  refresh_token: string;
  expiresIn: number;
};
export type TResponseUser = {
  user: TUser;
  tokens: TTokens;
};
export type TSendToEmail = {
  email: string;
  userId: string;
};
export type TConfirmEmail = {
  email: string;
  userId: string;
  code: string;
};

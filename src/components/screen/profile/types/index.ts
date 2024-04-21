import { TUser } from '@redux/types';
import { TClassName } from '@types';
import React from 'react';

export interface IProfileComponent {
  user: TUser;
}
export interface IGeneralProfile extends TClassName {
  user: TUser;
}
export interface IInputProfileWithLabel extends TClassName {
  label: string;
  name: string;
  placeholder: string;
  type?: 'text' | 'number' | 'password' | 'mail' | 'file';
  disabled?: boolean;
  require?: boolean;
}
export interface IConfirmOtp {
  email: string;
}
export type TProfileGeneralFormData = {
  name: string;
  lastname: string;
  username: string;
  email: string;
  age: number;
};
export type TProfileChangePasswordFormData = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};
export type TEmailForm = {
  email: string;
};
export type TOtpInput = {
  email: string;
  value: string;
  valueLength: number;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onEnterPressed: (_email: string) => Promise<void>;
};
export interface IChangePasswordProfile {
  userId: string;
}
export type TOtpResult = {
  success: boolean;
};

export interface IConfirmOtp {
  email: string;
}
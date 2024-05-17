import { TClubFormData } from '@components/screen/my-clubs/types';
import { TClub, TRating } from '@redux/types';
import { Dispatch } from '@reduxjs/toolkit';
import { FormikErrors, FormikProps, FormikValues } from 'formik';
import { Nullable } from 'primereact/ts-helpers';
import React, { PropsWithChildren } from 'react';
import { IconType } from 'react-icons';
import { LoadingType } from 'react-loading';
import { ObjectSchema } from 'yup';

export type TClassName = {
  className?: string;
};
export type TCypressDataId = {
  cypressId?: string;
};
export interface IPrivateRoute {
  component: React.ComponentType<any>;
}
export interface TBreadcrumb extends TClassName {
  pageName: string;
}

export type TCardList = {
  title?: string;
  clubs: Array<TClub>;
  showCount?: boolean;
};
export type TRatingValue = {
  rating: Nullable<number>;
  user: string | undefined;
  club: string;
};
export interface IClubRating {
  ratings: TRating[];
  clubId: string;
  userId: string;
}
export interface IClubFavorite {
  clubId: string;
}
export interface ICustomTable {
  header: React.ReactNode;
  body: React.ReactNode;
  caption?: string;
}
export interface IMapYandex {
  center?: number | number[];
  zoom: number;
}
export interface IButtonLoading {
  color?: string;
}
export type AsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  state?: unknown;
  /** type for `thunkApi.dispatch` */
  dispatch?: Dispatch;
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown;
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue?: unknown;
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown;
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown;
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown;
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown;
};
export interface IInputMaskWithLabel extends TClassName {
  name: string;
  label: string;
  placeholder: string;
  mask: string;
}
export interface IEditButtonStyled extends TClassName {
  text?: string;
  icon: IconType;
  disabled?: boolean;
  isLoading?: boolean;
  handleClick?: () => void;
  iconColor?: string;
  loaderIconColor?: string;
  iconSize?: number;
}
export type TSelectOption = {
  label: string;
  value: string;
};

export interface ISelectField extends TClassName {
  name: string;
  label: string;
  options: Array<TSelectOption>;
  require?: boolean;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void | FormikErrors<TClubFormData>>;
}
export interface IUploadFileWithFormik {
  name: string;
  namePictureUrl: string;
  label: string;
  require?: boolean;
  imageSizeRequired?: boolean;
  nameStateOnClose?: string;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => Promise<void | FormikErrors<TClubFormData>>;
  picture: File | null;
  pictureUrl?: string;
}
export interface IButtonWithLoader extends TClassName {
  disabled?: boolean;
  isLoading?: boolean;
  text: string;
  type?: 'submit' | 'button';
  handleClick?: () => void;
}
export interface IInputWithLabel extends PropsWithChildren, TClassName {
  name?: string;
  label: string;
  type?: 'text' | 'number' | 'password' | 'mail' | 'file';
  placeholder?: string;
  disabled?: boolean;
  require?: boolean;
  value?: string | number;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  innerClassName?: string;
  min?: number;
}
export interface ITimerHistory {
  club: TClub;
  global?: boolean;
}
export interface IMissingCards {
  message: string;
}
export interface IDialogConfirmDelete {
  _id: string;
  label: string;
  title: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  handleClick: (id: string) => void;
  confirmText: string;
}
export interface IAuthLayoutForm<T extends FormikValues> {
  initialAuthFormValue: T;
  label: string;
  onSubmit?: (values: FormikValues) => void;
  validationSchema?: ObjectSchema<any>;
  renderItemComponent: (formikProps: FormikProps<T>) => React.ReactNode;
  redirectText: string;
  redirectTo: string;
  redirectTitle: string;
}
export interface IPagination {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}
export interface ICardItem {
  club: TClub;
  showCount?: boolean;
}
export interface ICustomLoader extends TClassName {
  type?: LoadingType;
  color?: string;
  height?: number;
  width?: number;
}
export type TPlace = {
  region: string;
  city: string;
};
export interface ICustomSelect {
  name: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<TSelectOption>;
}

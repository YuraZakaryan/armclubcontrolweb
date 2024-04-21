import { TClub } from '@redux/types';
import { TClassName } from '@types';
import { IconType } from 'react-icons';

export interface IMyClubsComponent {
  authorId: string;
  activationStatus: boolean;
}
export interface IButtonAddClub {
  authorId: string;
  activationStatus?: boolean;
}
export type TClubFormData = {
  title: string;
  description: string;
  info: string;
  region: string;
  city: string;
  address: string;
  phone: string;
  picture: File | null;
  posterPicture: File | null;
  removePosterPicture: boolean;
  pictureUrl: string;
  posterPictureUrl: string;
  latitudeMap: string;
  longitudeMap: string;
  openingTime: string;
  closingTime: string;
};
export interface IClubEditDialog extends TClassName {
  club?: TClub;
  dialogKey?: string;
  customIcon?: IconType;
  buttonClassName?: string;
}

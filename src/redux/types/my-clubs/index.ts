import { TClub, TRequestStatus } from '@redux/types';

export type TClubEdit = {
  formData: FormData;
  clubId?: string;
  userId: string;
};
export type TMyClubsInitialState = {
  items: TClub[];
  fetch: TRequestStatus;
  create: TRequestStatus;
  edit: TRequestStatus;
};

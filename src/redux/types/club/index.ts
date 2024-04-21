import {
  TComment,
  TFetchParams,
  TItemsWithTotalLength,
  TRequestStatus,
  TTimer,
  TTimerHistories,
  TUser,
} from '@redux/types';

export type TFavorite = {
  _id: string;
  user: string;
  club: TClub;
};

export type TRating = {
  _id: string;
  user: string;
  rating: number;
  club: string;
};

export type TClub = {
  _id: string;
  title: string;
  description: string;
  info: string;
  region: string;
  city: string;
  address: string;
  phone: string;
  views: number;
  picture: string;
  posterPicture: string;
  pictures: string[];
  comments: Array<TComment>;
  ratings: Array<TRating>;
  prices: string[];
  timers: Array<TTimer>;
  timerHistories: Array<TTimerHistories>;
  favourites: Array<TFavorite>;
  latitudeMap: string;
  longitudeMap: string;
  openingTime: string;
  closingTime: string;
  author: TUser;
  createdAt: string;
  updatedAt: string;
};
export type TSearch = {
  open: boolean | null;
  isFocused: boolean;
  hasMore: boolean;
  content: string;
};
export type TInitialClubState = {
  club: TClub | null;
  clubs: TItemsWithTotalLength<TClub>;
  search: TSearch;
  searchedClubs: TItemsWithTotalLength<TClub>;
  topRatedClubs: TItemsWithTotalLength<TClub>;
  history: TItemsWithTotalLength<TClub>;
  favorites: TItemsWithTotalLength<TClub>;
  addHistory: TRequestStatus;
  setRatingState: TRequestStatus;
  toggleFavorite: TRequestStatus;
  fetchClub: TRequestStatus;
  deleteClub: TRequestStatus;
};
export interface IFetchClubsParams extends TFetchParams {
  region?: string;
  city?: string;
  title?: string;
  random?: boolean;
  byRating?: boolean;
}

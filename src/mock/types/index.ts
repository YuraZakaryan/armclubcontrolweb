import { TComment } from '@/screens/club/types';
import { Session } from 'next-auth';

export type TTimer = {
  _id: string;
  title: string;
  isActive: boolean;
};
export type TRating = {
  _id: string;
  user: string;
  rating: number;
  club: string;
};
export type TFavorite = {
  _id: string;
  user: string;
  club: TClub;
};
export type TTimerHistories = {
  _id: string;
  title: string;
  time: string;
  start: string;
  end: string;
  price: number;
  finalPrice: number;
  isInfinite: boolean;
  manuallyStopped: boolean;
  club: TClub;
};
export type TClub = {
  _id: string;
  title: string;
  description: string;
  info: string;
  picture: string;
  timers: Array<TTimer>;
  comments: Array<TComment>;
  region: string;
  city: string;
  address: string;
  phone: string;
  views: number;
  ratings: Array<TRating>;
  favourites: Array<TFavorite>;
  latitudeMap: string;
  longitudeMap: string;
  openingTime: string;
  closingTime: string;
  timerHistories: Array<TTimerHistories>;
  author: Session['user'];
};

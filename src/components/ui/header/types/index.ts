import { TTimer } from '@redux/types';
import { TCypressDataId } from '@types';

export interface IHeaderBarItem extends TCypressDataId {
  title: string;
  url: string;
}
export interface ISearchCardItem {
  _id: string;
  title: string;
  picture: string;
  timers: TTimer[];
}

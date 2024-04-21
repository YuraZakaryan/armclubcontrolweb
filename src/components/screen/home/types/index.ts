import { MouseEventHandler, PropsWithChildren } from 'react';

export interface ISwiperIconWrapper extends PropsWithChildren {
  handleClick: MouseEventHandler<HTMLElement>;
  disabled: boolean;
}

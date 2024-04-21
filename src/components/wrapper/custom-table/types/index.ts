import { TClassName } from '@types'
import { PropsWithChildren } from 'react'

export interface ICustomTableRow extends PropsWithChildren, TClassName {
  handleClick?: () => void;
}
export interface ITimerPercent {
  isActive: boolean;
  isInfinite: boolean;
  remainingTime: string;
  defineTime: string;
}
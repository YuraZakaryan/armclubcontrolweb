import { useAppSelector } from '@hooks/redux';
import cn from 'classnames';
import React, { PropsWithChildren } from 'react';

export const SearchCardList: React.FC<PropsWithChildren> = ({ children }) => {
  const { searchedClubs } = useAppSelector((state) => state.club);

  const isLoading = searchedClubs.isLoading;
  const isError = searchedClubs.isError;

  return (
    <ul
      className={cn(
        'absolute top-[calc(100%+2px)] flex max-h-56 w-full flex-col overflow-auto rounded-lg bg-primary shadow scrollbar-thin scrollbar-thumb-slate-300',
        isError && !isLoading && 'h-20 items-center justify-center',
      )}
    >
      {isError && !isLoading ? (
        <li className="mobile-max:text-sm">
          <p>Չեն գտնվել ակումբներ</p>
        </li>
      ) : (
        children
      )}
    </ul>
  );
};

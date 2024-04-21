import { CardItem, CategoryTitle } from '@components/wrapper';
import { TClub } from '@redux/types';
import { TCardList } from '@types';
import React from 'react';

export const CardList: React.FC<TCardList> = React.memo((props) => {
  const { title, clubs } = props;

  return (
    <section className="flex flex-col">
      {title ? <CategoryTitle>{title}</CategoryTitle> : null}
      <ul className="mt-5 grid grid-cols-4 justify-center gap-x-3  gap-y-5 tablet-max:!grid-cols-2 mobile-max:!grid-cols-1 laptop-hd-max:grid-cols-3">
        {Array.isArray(clubs) && clubs.length > 0
          ? clubs.map((club: TClub, index: number) => {
              return <CardItem key={index} club={club} />;
            })
          : null}
      </ul>
    </section>
  );
});
CardList.displayName = 'CardList';

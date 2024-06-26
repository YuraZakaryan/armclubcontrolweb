import { ISearchCardItem } from '@components/ui/header/types';
import { API_URL } from '@utils/constants';
import { Image } from 'primereact/image';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchCardItem: React.FC<ISearchCardItem> = React.memo((props) => {
  const { _id, title, picture } = props;

  const navigate = useNavigate();

  const handleNavigate = (): void => {
    navigate(`/club/${_id}`);
  };

  return (
    <li
      className={
        'flex h-14 w-full cursor-pointer items-center justify-between border-b border-gray-200 p-3 transition-all hover:bg-gray-200 hover:text-black'
      }
    >
      <button className="flex w-full items-center gap-2" onClick={handleNavigate}>
        <section className="flex items-center gap-2">
          <Image
            src={API_URL + '/' + picture}
            alt="logo"
            width="50px"
            height="50px"
            className="overflow-hidden rounded"
          />
          <h3>{title}</h3>
        </section>
      </button>
    </li>
  );
});
SearchCardItem.displayName = 'SearchCardItem';

import { Button } from '@components/shadcn/ui/button';
import { ClubFavorite, ClubRating } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { addClubToHistoryThunk, viewClubThunk } from '@redux/http/club';
import { ICardItem } from '@types';
import { calculateClubOccupancy, isClubClosed } from '@utils/club';
import { API_URL } from '@utils/constants';
import cn from 'classnames';
import { Image } from 'primereact/image';
import { Tag } from 'primereact/tag';
import React from 'react';
import { FaEye, FaRegComments } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export const CardItem: React.FC<ICardItem> = React.memo((props) => {
  const { club } = props;

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { _id, title, description, picture, openingTime, closingTime, ratings, comments, timers } = club;

  const navigate = useNavigate();

  const handleNavigate = async (): Promise<void> => {
    navigate(`/club/${_id}`);
    await dispatch(addClubToHistoryThunk(_id));
    await dispatch(viewClubThunk(_id));
  };

  const closed: boolean = isClubClosed(openingTime, closingTime);

  return (
    <li
      className={
        'flex max-w-[330px] flex-shrink-0 flex-col gap-2 overflow-hidden rounded-lg border-gray-600 bg-primary pb-3 shadow-lg mobile-max:w-full mobile-max:max-w-full'
      }
    >
      <section className={'relative cursor-pointer'}>
        {closed ? (
          <Tag value="Այս ժամին փակ է" className={'absolute right-0 z-[20] m-2 bg-gray-600 px-3 py-1 text-[12px]'} />
        ) : (
          <Tag value="Այս ժամին բաց է" className={'absolute right-0 z-[20] m-2 bg-green-600 px-3 py-1 text-[12px]'} />
        )}

        <Image
          src={API_URL + '/' + picture}
          alt={club.title}
          width="500px"
          height="500px"
          className={cn(closed && 'brightness-50')}
          imageClassName={'!h-[185px]'}
          indicatorIcon={<FaEye color="white" size={20} />}
          preview
        />
      </section>
      <article className={'mx-auto flex w-11/12 flex-col gap-3'}>
        <section className={' flex justify-between border-b border-gray-600 pb-3'}>
          <button onClick={handleNavigate}>
            <h3
              className={'hover:text-secondary cursor-pointer text-lg text-text transition-all laptop-hd-max:text-base'}
            >
              {title}
            </h3>
          </button>
          <div className={'flex items-center gap-4'}>
            <span className={'flex items-center gap-1'}>
              <FaRegComments size={18} className={'text-secondary'} />
              <p className="text-sm">{comments.length}</p>
            </span>
            <ClubRating clubId={_id} ratings={ratings} userId={user?._id as string} />
          </div>
        </section>
        <section className={'h-[103px] border-b border-gray-600 pb-3'}>
          {timers.length !== 0 ? (
            <p className={'mb-1 flex gap-1 text-sm'}>
              <span className={'text-secondary text-[12px]'}>Զբաղվածության աստիճան։</span>
              <span className={'underline'}>{calculateClubOccupancy(timers)}%</span>
            </p>
          ) : null}
          <p
            className={
              'first-letter:text-secondary line-clamp-3 text-[12px] text-sm text-gray-600 first-letter:uppercase'
            }
          >
            {description ? description : null}
          </p>
        </section>
        <section className={'flex w-full items-center justify-between'}>
          <ClubFavorite clubId={_id} />
          <Button className={'px-5'} onClick={handleNavigate}>
            Մանրամասն
          </Button>
        </section>
      </article>
    </li>
  );
});
CardItem.displayName = 'CardItem';

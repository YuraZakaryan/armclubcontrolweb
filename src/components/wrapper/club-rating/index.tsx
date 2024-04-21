import { Popover, PopoverContent, PopoverTrigger } from '@components/shadcn/ui/popover';
import { useAppDispatch } from '@hooks/redux';
import { setRatingThunk } from '@redux/http/rating';
import { TRating } from '@redux/types';
import { IClubRating, TRatingValue } from '@types';
import { calculateAverageRating } from '@utils/club';
import cn from 'classnames';
import { Rating, RatingChangeEvent } from 'primereact/rating';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BiWinkSmile } from 'react-icons/bi';
import { Link } from 'react-router-dom';

export const ClubRating: React.FC<IClubRating> = React.memo((props) => {
  const { ratings, userId, clubId } = props;

  const dispatch = useAppDispatch();
  const rating: number = calculateAverageRating(ratings);
  const userRating = ratings.find((rating: TRating): boolean => rating.user === userId);

  const [ratingValue, setRatingValue] = React.useState<TRatingValue>({
    rating: userRating ? userRating.rating : null,
    user: userId,
    club: clubId,
  });

  const handleRating = async (event: RatingChangeEvent) => {
    const { value } = event;

    setRatingValue((prev) => {
      const updatedRatingValue = {
        ...prev,
        rating: ratingValue.rating === value ? 0 : value,
      };

      if (updatedRatingValue.rating !== null && !!updatedRatingValue.user && !!updatedRatingValue.club) {
        dispatch(setRatingThunk(updatedRatingValue));
      }

      return updatedRatingValue;
    });
  };
  return (
    <span className={'flex items-center gap-1'}>
      <Popover>
        <PopoverTrigger>
          <AiFillStar size={16} className={cn('text-yellow-500', userRating && 'text-yellow-600')} />
        </PopoverTrigger>
        <PopoverContent>
          {userId ? (
            <Rating value={ratingValue.rating ?? undefined} onChange={handleRating} cancel={false} stars={10} />
          ) : (
            <div className={'text-[12px]'}>
              <span>Եթե ցանկանում եք գնահատական դնել, կխնդրենք </span>

              <Link to="/login" className="text-secondary inline-flex items-center font-bold underline">
                Մուտք գործել
                <BiWinkSmile className={'ml-1 inline'} size={15} />
              </Link>
            </div>
          )}
        </PopoverContent>
      </Popover>
      <p className="text-sm">{rating}</p>
    </span>
  );
});
ClubRating.displayName = 'ClubRating';

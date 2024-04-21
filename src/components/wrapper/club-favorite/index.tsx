import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { toggleClubFavoriteThunk } from '@redux/http/club';
import { IClubFavorite } from '@types';
import React, { useEffect, useState } from 'react';
import { BsBookmarkPlus, BsBookmarkPlusFill } from 'react-icons/bs';

export const ClubFavorite: React.FC<IClubFavorite> = React.memo((props) => {
  const { clubId } = props;

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      setFavorites(user?.favourites as string[]);
    }
  }, [user]);

  const isFavorite: boolean = favorites.includes(clubId);

  const handleFavoriteToggle = async (): Promise<void> => {
    await dispatch(toggleClubFavoriteThunk(clubId));
  };

  return user ? (
    <span className="flex items-center gap-1">
      <button className="transition-all hover:opacity-60" onClick={handleFavoriteToggle}>
        {isFavorite ? <BsBookmarkPlusFill size={22} color={'orange'} /> : <BsBookmarkPlus size={22} />}
      </button>
    </span>
  ) : null;
});

ClubFavorite.displayName = 'ClubFavorite';

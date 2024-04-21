import { useAppSelector } from '@hooks/redux';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';
import { SwiperIconWrapper } from '@components/screen/home/wrapper';
import 'react-image-gallery/styles/css/image-gallery.css';
import ReactImageGallery from 'react-image-gallery';
import { TClub } from '@redux/types';
import React, { MouseEventHandler } from 'react';
import { API_URL } from '@utils';

export const AdPoster = () => {
  const { clubs } = useAppSelector((state) => state.club);

  const items: TClub[] = clubs.items;

  const images = React.useMemo(() => {
    const filteredItems: TClub[] = items.filter((item: TClub) => item.posterPicture);
    return filteredItems.map((club: TClub) => ({
      original: `${API_URL + '/' + club.posterPicture}`,
    }));
  }, [items]);

  return (
    clubs.totalItems > 0 && (
      <div className="flex justify-center">
        <ReactImageGallery
          items={images}
          showFullscreenButton={false}
          showThumbnails={false}
          showPlayButton={false}
          showNav={false}
          useBrowserFullscreen={false}
          showBullets
          autoPlay
          renderLeftNav={(onClick: MouseEventHandler<HTMLElement>, disabled: boolean) => (
            <SwiperIconWrapper handleClick={onClick} disabled={disabled}>
              <FaAngleLeft size={22} color="silver" />
            </SwiperIconWrapper>
          )}
          renderRightNav={(onClick: MouseEventHandler<HTMLElement>, disabled: boolean) => (
            <SwiperIconWrapper handleClick={onClick} disabled={disabled}>
              <FaAngleRight size={22} color="silver" />
            </SwiperIconWrapper>
          )}
        />
      </div>
    )
  );
};

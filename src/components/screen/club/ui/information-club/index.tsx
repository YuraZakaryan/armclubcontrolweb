import { regionCities } from '@components/screen/club/data';
import type { TSelectOption } from '@components/screen/club/types';
import { ClubFavorite } from '@components/wrapper';
import { useAppSelector } from '@hooks/redux';
import { TClub } from '@redux/types';
import { calculateAverageRating, calculateClubOccupancy, isClubClosed } from '@utils/club';
import { API_URL } from '@utils/constants';
import cn from 'classnames';
import { Image } from 'primereact/image';
import { Tag } from 'primereact/tag';
import { AiFillStar, AiOutlineShareAlt } from 'react-icons/ai';
import { VscReport } from 'react-icons/vsc';

export const InformationClub = () => {
  const { club } = useAppSelector((state) => state.club);

  if (!club) {
    return <div>Loading...</div>;
  }

  const currentClub: TClub = club as TClub;

  const {
    _id,
    title,
    picture,
    description,
    openingTime,
    phone,
    author,
    closingTime,
    region,
    city,
    address,
    timers,
    ratings,
  } = currentClub as TClub;

  const averageRating: number = calculateAverageRating(ratings);

  const closed: boolean = openingTime !== '00:00' && closingTime !== '00:00' && isClubClosed(openingTime, closingTime);

  const citiesForRegion = regionCities[region] || [];

  const cityLabel = citiesForRegion.find((option: TSelectOption): boolean => option.value === city)?.label;

  const displayCityLabel: string = cityLabel || regionCities['yerevan'][0]?.label || 'Քաղաքը նշված չէ';

  return (
    <div className={'flex overflow-hidden rounded-lg tablet-max:flex-col'}>
      <section
        className={
          'relative overflow-hidden tablet-max:w-full tablet-min:border-r tablet-min:border-gray-600 tablet-min:pr-10'
        }
      >
        {closed ? (
          <Tag value="Փակ է" className={'absolute left-0 z-[20] m-3 rounded bg-gray-600 px-3 py-1 text-sm'} />
        ) : null}
        <Image
          src={API_URL + '/' + picture}
          width="1000px"
          height="1000px"
          className={cn('h-auto w-auto rounded-lg tablet-max:h-full tablet-max:w-full', closed && 'brightness-50')}
          alt={title}
        />
      </section>
      <div className={'flex w-full flex-col justify-between tablet-max:mt-3 tablet-min:pl-10'}>
        <div className={'flex w-full flex-col gap-2 pr-5'}>
          <section className={'flex w-full flex-col gap-1 border-b border-gray-600 pb-3'}>
            <div className={'flex w-full items-center justify-between'}>
              <h1 className={'text-2xl'}>{title}</h1>
              <ClubFavorite clubId={_id} />
            </div>
            <div className={'flex w-full items-center justify-between'}>
              <span className={'flex items-center gap-1'}>
                <AiFillStar size={20} className={cn('text-yellow-500')} />
                <p>{averageRating}</p>
              </span>
              <p>
                <span className={'text-secondary text-sm'}>Բացվում է։ </span>
                <i className={'ml-1 text-text_success underline'}>{openingTime}-ին</i>
              </p>
            </div>
          </section>
          <div className={'flex flex-col justify-center gap-2 text-sm'}>
            <p
              className={
                'first-letter:text-secondary border-b border-gray-600 pb-3 text-sm text-text-nav first-letter:uppercase tablet-max:text-[12px]'
              }
            >
              {description ? description : null}
            </p>
            <section className={'flex flex-col gap-2 border-b border-gray-600 pb-3'}>
              <p>
                <span className={'text-secondary'}>Քաղաք։ </span>
                <i className="text-text-nav underline">{displayCityLabel}</i>
              </p>
              <p>
                <span className={'text-secondary'}>Հասցե։ </span>
                <i className="text-text-nav underline">{address}</i>
              </p>
              <p>
                <span className={'text-secondary'}>Հեռախոսահամար։ </span>
                <i className="text-text-nav underline">{phone}</i>
              </p>
              <p>
                <span className={'text-secondary'}>Սեփականատեր։ </span>
                <i className="text-text-nav underline">{author.name + ' ' + author.lastname}</i>
              </p>
            </section>
            {timers.length !== 0 ? (
              <p className={'mb-1 flex gap-1 text-sm'}>
                <span className={'text-secondary tablet-max:text-[12px]'}>Զբաղվածության աստիճան։</span>
                <i className={'underline'}>{calculateClubOccupancy(timers)}%</i>
              </p>
            ) : null}
            <p>
              <span className={'text-secondary'}>Կարգավիճակը։</span>
              <i className={'ml-1 text-text_success underline'}>
                {isClubClosed(openingTime, closingTime) ? 'ՓԱԿ Է' : 'ԲԱՑ Է'}
              </i>
              &nbsp;
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 self-end">
          <button>
            <AiOutlineShareAlt size={25} />
          </button>
          <button>
            <VscReport size={25} className="text-secondary" />
          </button>
        </div>
      </div>
    </div>
  );
};

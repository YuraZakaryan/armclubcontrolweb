import { AdPoster } from '@components/screen/home/ui';
import { Loader } from '@components/ui';
import { CardList, Main } from '@components/wrapper';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { fetchClubsThunk } from '@redux/http/club';
import { TClub } from '@redux/types';
import { DEFAULT_PER_PAGE } from '@utils';
import { useCallback, useEffect } from 'react';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

export const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const { clubs } = useAppSelector((state) => state.club);

  const fetchClubs = useCallback((): void => {
    dispatch(fetchClubsThunk({ limit: DEFAULT_PER_PAGE, random: true }));
  }, []);

  useEffect((): void => {
    fetchClubs();
  }, [fetchClubs]);

  const items: TClub[] = clubs.items;
  const isLoading = clubs.isLoading;

  // function SampleNextArrow(props) {
  //   const { className, style, onClick } = props;
  //   return <div className={className} style={{ ...style, display: 'block' }} onClick={onClick} />;
  // }
  //
  // function SamplePrevArrow(props) {
  //   const { className, style, onClick } = props;
  //   return <div className={className} style={{ ...style, display: 'block', background: 'green' }} onClick={onClick} />;
  // }
  //
  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   autoplay: true,
  //   speed: 2000,
  //   autoplaySpeed: 2000,
  //   slidesToShow: 4,
  //   slidesToScroll: 2,
  //   cssEase: 'linear',
  //   centerMode: true,
  //   pauseOnHover: true,
  //   nextArrow: <SamplePrevArrow />,
  //   prevArrow: <SampleNextArrow />,
  // };

  return isLoading ? (
    <Loader />
  ) : (
    <Main>
      <div>
        <AdPoster />
        {/*<Slider {...settings}>*/}
        {/*  {items.map((club, index) => (*/}
        {/*    <div key={index}>*/}
        {/*      <CardItem club={club} />*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</Slider>*/}
        <CardList clubs={items} />
      </div>
    </Main>
  );
};

import { useAppDispatch } from '@hooks';
import {
  ByRegionClub,
  ByTimersClub,
  Club,
  ClubControl,
  FavoriteClubs,
  HistoryClubs,
  Home,
  Login,
  NotFound,
  Profile,
  Registration,
  Settings,
  TimerHistory,
  TopRatedClubs,
} from '@pages';
import { MyClubs } from '@pages/my-clubs';
import { meThunk } from '@redux/http';
import { AuthRoute, ProtectedRoute, Root } from '@routers';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(meThunk());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Root />} errorElement={<NotFound />}>
        <Route path="/" element={<Home />} />
        <Route path="/top-rated" element={<TopRatedClubs />} />
        <Route path="/by-region" element={<ByRegionClub />} />
        <Route path="/by-computers" element={<ByTimersClub />} />
        <Route element={<AuthRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="club">
            <Route path="favorite" element={<FavoriteClubs />} />
            <Route path="history" element={<HistoryClubs />} />
            <Route path="timer-history" element={<TimerHistory />} />
            <Route path="my-clubs" element={<MyClubs />} />
            <Route path=":clubId" element={<Club />} />
            <Route path="control/:clubId" element={<ClubControl />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;

import {
  clubControlReducer,
  clubReducer,
  commentReducer,
  dialogReducer,
  myClubsReducer,
  timerReducer,
  userReducer,
} from '@redux/reducers';
import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

const rootReducer = combineReducers({
  user: userReducer,
  club: clubReducer,
  myClubs: myClubsReducer,
  comment: commentReducer,
  dialog: dialogReducer,
  clubControl: clubControlReducer,
  timer: timerReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  });
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;

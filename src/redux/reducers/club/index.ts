import {
  addClubToHistoryThunk,
  deleteClubThunk,
  fetchByRegionClubsThunk,
  fetchByTimerClubsThunk,
  fetchClubHistoryThunk,
  fetchClubsThunk,
  fetchClubThunk,
  fetchFavoriteClubsThunk,
  fetchTopRatedClubsThunk,
  getLocationByYandex,
  searchClubsThunk,
  toggleClubFavoriteThunk,
} from '@redux/http/club';
import { setRatingThunk } from '@redux/http/rating';
import type { TClub, TInitialClubState } from '@redux/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const initialState: TInitialClubState = {
  club: null,
  clubs: {
    items: [],
    totalItems: 0,
    isError: false,
    isLoading: null,
  },
  search: {
    open: null,
    isFocused: false,
    hasMore: true,
    content: '',
  },
  searchedClubs: {
    items: [],
    totalItems: 0,
    isError: false,
    isLoading: null,
  },
  topRatedClubs: {
    items: [],
    totalItems: 0,
    isError: false,
    isLoading: null,
  },
  byRegionClubs: {
    items: [],
    totalItems: 0,
    isError: false,
    isLoading: null,
  },
  byTimerClubs: {
    items: [],
    totalItems: 0,
    isError: false,
    isLoading: null,
  },
  setRatingState: {
    isLoading: null,
    isError: false,
  },
  toggleFavorite: {
    isLoading: null,
    isError: false,
  },
  fetchClub: {
    isLoading: null,
    isError: false,
  },
  history: {
    items: [],
    totalItems: 0,
    isError: false,
    isLoading: null,
  },
  favorites: {
    items: [],
    totalItems: 0,
    isError: false,
    isLoading: null,
  },
  addHistory: {
    isLoading: false,
    isError: false,
  },
  deleteClub: {
    isLoading: false,
    isError: false,
  },
  location: {
    place: {
      region: '',
      city: '',
    },
    isLoading: null,
    isError: false,
  },
};

const clubSlice = createSlice({
  name: 'club',
  initialState,
  reducers: {
    setOpen(state: TInitialClubState, action: PayloadAction<boolean>) {
      state.search.open = action.payload;
    },
    setContent(state: TInitialClubState, action: PayloadAction<string>) {
      state.search.content = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubsThunk.fulfilled, (state: TInitialClubState, action) => {
        state.clubs = {
          items: action.payload.items,
          totalItems: action.payload.totalItems,
          isLoading: false,
          isError: false,
        };
      })
      .addCase(fetchClubsThunk.pending, (state: TInitialClubState): void => {
        state.clubs.isLoading = true;
        state.clubs.isError = false;
      })
      .addCase(fetchClubsThunk.rejected, (state: TInitialClubState): void => {
        state.clubs = {
          items: [],
          totalItems: 0,
          isLoading: false,
          isError: true,
        };
      })
      .addCase(searchClubsThunk.fulfilled, (state: TInitialClubState, action) => {
        const { items, totalItems } = action.payload;
        state.searchedClubs = {
          items,
          totalItems,
          isLoading: false,
          isError: false,
        };
      })

      .addCase(searchClubsThunk.pending, (state: TInitialClubState): void => {
        state.searchedClubs.isLoading = true;
        state.searchedClubs.isError = false;
      })
      .addCase(searchClubsThunk.rejected, (state: TInitialClubState): void => {
        state.searchedClubs = {
          items: [],
          totalItems: 0,
          isLoading: false,
          isError: true,
        };
      })
      .addCase(fetchTopRatedClubsThunk.fulfilled, (state: TInitialClubState, action) => {
        state.topRatedClubs = {
          items: action.payload.items,
          totalItems: action.payload.totalItems,
          isLoading: false,
          isError: false,
        };
      })
      .addCase(fetchTopRatedClubsThunk.pending, (state: TInitialClubState): void => {
        state.topRatedClubs.isLoading = true;
        state.topRatedClubs.isError = false;
      })
      .addCase(fetchTopRatedClubsThunk.rejected, (state: TInitialClubState): void => {
        state.topRatedClubs = {
          items: [],
          totalItems: 0,
          isLoading: false,
          isError: true,
        };
      })
      .addCase(fetchByTimerClubsThunk.fulfilled, (state: TInitialClubState, action) => {
        state.byTimerClubs = {
          items: action.payload.items,
          totalItems: action.payload.totalItems,
          isLoading: false,
          isError: false,
        };
      })
      .addCase(fetchByTimerClubsThunk.pending, (state: TInitialClubState): void => {
        state.byTimerClubs.isLoading = true;
        state.byTimerClubs.isError = false;
      })
      .addCase(fetchByTimerClubsThunk.rejected, (state: TInitialClubState): void => {
        state.byTimerClubs = {
          items: [],
          totalItems: 0,
          isLoading: false,
          isError: true,
        };
      })
      .addCase(fetchByRegionClubsThunk.fulfilled, (state: TInitialClubState, action) => {
        state.byRegionClubs = {
          items: action.payload.items,
          totalItems: action.payload.totalItems,
          isLoading: false,
          isError: false,
        };
      })
      .addCase(fetchByRegionClubsThunk.pending, (state: TInitialClubState): void => {
        state.byRegionClubs.isLoading = true;
        state.byRegionClubs.isError = false;
      })
      .addCase(fetchByRegionClubsThunk.rejected, (state: TInitialClubState): void => {
        state.byRegionClubs = {
          items: [],
          totalItems: 0,
          isLoading: false,
          isError: true,
        };
      })
      .addCase(setRatingThunk.fulfilled, (state: TInitialClubState) => {
        state.setRatingState = {
          isLoading: false,
          isError: false,
        };
      })
      .addCase(setRatingThunk.pending, (state: TInitialClubState): void => {
        state.setRatingState = {
          isLoading: true,
          isError: false,
        };
      })
      .addCase(setRatingThunk.rejected, (state: TInitialClubState): void => {
        state.setRatingState = {
          isLoading: false,
          isError: true,
        };
      })
      .addCase(toggleClubFavoriteThunk.fulfilled, (state: TInitialClubState): void => {
        state.toggleFavorite = initialState.toggleFavorite;
      })
      .addCase(toggleClubFavoriteThunk.pending, (state: TInitialClubState): void => {
        state.toggleFavorite = {
          isLoading: true,
          isError: false,
        };
      })
      .addCase(toggleClubFavoriteThunk.rejected, (state: TInitialClubState): void => {
        state.toggleFavorite = {
          isLoading: false,
          isError: true,
        };
      })
      .addCase(fetchClubThunk.fulfilled, (state: TInitialClubState, action: PayloadAction<TClub>): void => {
        state.club = action.payload;
        state.fetchClub = {
          isLoading: false,
          isError: false,
        };
      })
      .addCase(fetchClubThunk.pending, (state: TInitialClubState): void => {
        state.club = null;
        state.fetchClub = {
          isLoading: true,
          isError: false,
        };
      })
      .addCase(fetchClubThunk.rejected, (state: TInitialClubState): void => {
        state.club = null;
        state.fetchClub = {
          isLoading: false,
          isError: true,
        };
      })
      .addCase(addClubToHistoryThunk.fulfilled, (state: TInitialClubState): void => {
        state.addHistory = initialState.addHistory;
      })
      .addCase(addClubToHistoryThunk.pending, (state: TInitialClubState): void => {
        state.addHistory = {
          isLoading: true,
          isError: false,
        };
      })
      .addCase(addClubToHistoryThunk.rejected, (state: TInitialClubState): void => {
        state.addHistory = {
          isLoading: false,
          isError: true,
        };
      })
      .addCase(fetchClubHistoryThunk.fulfilled, (state: TInitialClubState, action): void => {
        state.history = {
          items: action.payload.items,
          totalItems: action.payload.totalItems,
          isLoading: false,
          isError: false,
        };
      })
      .addCase(fetchClubHistoryThunk.pending, (state: TInitialClubState): void => {
        state.history.isLoading = true;
        state.history.isError = false;
      })
      .addCase(fetchClubHistoryThunk.rejected, (state: TInitialClubState): void => {
        state.history.isLoading = false;
        state.history.isError = true;
      })
      .addCase(fetchFavoriteClubsThunk.fulfilled, (state: TInitialClubState, action): void => {
        state.favorites = {
          items: action.payload.items,
          totalItems: action.payload.totalItems,
          isLoading: false,
          isError: false,
        };
      })
      .addCase(fetchFavoriteClubsThunk.pending, (state: TInitialClubState): void => {
        state.favorites.isLoading = true;
        state.favorites.isError = false;
      })
      .addCase(fetchFavoriteClubsThunk.rejected, (state: TInitialClubState): void => {
        state.favorites.isLoading = false;
        state.favorites.isError = true;
      })
      .addCase(deleteClubThunk.fulfilled, (state: TInitialClubState): void => {
        state.deleteClub = initialState.deleteClub;
      })
      .addCase(deleteClubThunk.pending, (state: TInitialClubState): void => {
        state.deleteClub = {
          isLoading: true,
          isError: false,
        };
      })
      .addCase(deleteClubThunk.rejected, (state: TInitialClubState): void => {
        state.deleteClub = {
          isLoading: false,
          isError: true,
        };
      })
      .addCase(getLocationByYandex.fulfilled, (state: TInitialClubState, action) => {
        const { response } = action.payload;

        const region =
          response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.AdministrativeAreaName.toLocaleLowerCase();
        const city =
          response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country.AdministrativeArea.Locality.LocalityName.toLocaleLowerCase();

        const cleanedRegion = region.replace(/ region$/, '');

        if (region && city) {
          state.location = {
            place: {
              region: cleanedRegion,
              city,
            },
            isLoading: false,
            isError: false,
          };
        }
      })

      .addCase(getLocationByYandex.pending, (state: TInitialClubState): void => {
        state.location.isLoading = true;
        state.location.isError = false;
      })
      .addCase(getLocationByYandex.rejected, (state: TInitialClubState): void => {
        state.location = { ...initialState.location, isError: true };
      });
  },
});
export const clubReducer = clubSlice.reducer;
export const { setContent, setOpen } = clubSlice.actions;

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import type { Moment } from 'moment';

type SearchState = {
  destination: string;
  checkIn:  string | null;
  checkOut:  string | null;
  adultCount: number;
  childCount: number;
  hotelId?: string;
};

const initialState: SearchState = {
  destination: '',
  checkIn: null,
  checkOut: null,
  adultCount: 1,
  childCount: 0,
};

const toISOString = (date: Date | string | Moment | null): string | null => {
  if (!date) return null;
  return moment(date, "YYYY-MM-DD").format("MMM DD, YYYY")
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // Action to set all search values at once
    saveSearchValues: (state, action: PayloadAction<{
      destination: string;
      checkIn: Date | string | Moment | null;
      checkOut: Date | string | Moment | null;
      adultCount: number;
      childCount: number;
      hotelId?: string;
    }>) => {
      state.destination = action.payload.destination;
      state.checkIn = toISOString(action.payload.checkIn);
      state.checkOut = toISOString(action.payload.checkOut);
      state.adultCount = action.payload.adultCount;
      state.childCount = action.payload.childCount;
      if (action.payload.hotelId) {
        state.hotelId = action.payload.hotelId;
      }
    },
    // New actions to specifically set each field
    setDestination: (state, action: PayloadAction<string>) => {
      state.destination = action.payload;
    },
    setCheckIn: (state, action: PayloadAction<Date | null>) => {
      state.checkIn = toISOString(action.payload);
    },
    setCheckOut: (state, action: PayloadAction<Date | null>) => {
      state.checkOut = toISOString(action.payload);
    },
    setAdultCount: (state, action: PayloadAction<number>) => {
      state.adultCount = action.payload;
    },
    setChildCount: (state, action: PayloadAction<number>) => {
      state.childCount = action.payload;
    },
    // Optional: Action to reset search values
    resetSearchValues: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  saveSearchValues,
  setDestination,
  setCheckIn,
  setCheckOut,
  setAdultCount,
  setChildCount,
  resetSearchValues
} = searchSlice.actions;

export default searchSlice.reducer;

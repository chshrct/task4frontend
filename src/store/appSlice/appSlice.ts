import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: { isAppInitialized: false },
  reducers: {
    setIsAppInitialized: (state, { payload }: PayloadAction<boolean>) => {
      state.isAppInitialized = payload;
    },
  },
});

export const appReducer = appSlice.reducer;

export const { setIsAppInitialized } = appSlice.actions;

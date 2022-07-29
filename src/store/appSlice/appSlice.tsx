import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: { error: '' },
  reducers: {
    setError(state, { payload }: PayloadAction<string>) {
      state.error = payload;
    },
  },
});

export const appReducer = appSlice.reducer;
export const { setError } = appSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: '',
    email: '',
  },
  reducers: {
    setAuthedUser(state, { payload }: PayloadAction<{ id: string; email: string }>) {
      state.id = payload.id;
      state.email = payload.email;
    },
    signOut(state) {
      state.email = '';
      state.id = '';
      localStorage.removeItem('token');
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setAuthedUser, signOut } = authSlice.actions;

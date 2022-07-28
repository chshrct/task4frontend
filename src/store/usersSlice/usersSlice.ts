import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserEntityType } from './types';

import { UserType } from 'api/usersApi/types';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as UserEntityType[],
  },
  reducers: {
    setUsers(state, { payload: users }: PayloadAction<UserType[]>) {
      state.users = users.map(user => ({ ...user, selected: false }));
    },
    toggleUserSelect(state, { payload: id }: PayloadAction<string>) {
      const userIndex = state.users.findIndex(user => user.id === id);

      if (userIndex > -1)
        state.users[userIndex].selected = !state.users[userIndex].selected;
    },
    toggleUsersSelect(state, { payload }: PayloadAction<boolean>) {
      state.users.forEach(user => {
        user.selected = payload;
      });
    },
    deleteUsersStore(state, { payload }: PayloadAction<string[]>) {
      state.users = state.users.filter(user => !payload.includes(user.id));
    },
  },
});

export const { setUsers, toggleUserSelect, toggleUsersSelect, deleteUsersStore } =
  usersSlice.actions;

export const usersReducer = usersSlice.reducer;

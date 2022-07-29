import { UserEntityType } from './types';

import { RootState } from 'store';

export const selectUsers = (state: RootState): UserEntityType[] => state.users.users;
export const selectSelectedUsers = (state: RootState): string[] =>
  state.users.users.filter(user => user.selected).map(user => user.id);

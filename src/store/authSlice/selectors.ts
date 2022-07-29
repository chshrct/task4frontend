import { RootState } from 'store';

export const selectId = (state: RootState): string => state.auth.id;
export const selectIsAuthed = (state: RootState): boolean => !!state.auth.id;
export const selectEmail = (state: RootState): string => state.auth.email;

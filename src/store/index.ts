import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { appReducer } from './appSlice/appSlice';
import { authReducer } from './authSlice/authSlice';
import { usersReducer } from './usersSlice/usersSlice';

import { usersApi } from 'api/usersApi/usersApi';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    auth: authReducer,
    users: usersReducer,
    app: appReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

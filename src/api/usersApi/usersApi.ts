import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { UserType } from './types';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: builder => ({
    getUsers: builder.query<UserType[], void>({
      query: () => ({
        url: 'users',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }),
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;

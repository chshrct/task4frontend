import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  AuthCheckResponseType,
  SignInQueryType,
  SignInResponseType,
  SignUpQueryType,
  SignUpResponseType,
  UserType,
} from './types';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['SIGNUP', 'SIGNIN'],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: builder => ({
    authCheck: builder.query<AuthCheckResponseType, void>({
      query: () => ({
        url: 'auth-check',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }),
    }),
    signUp: builder.mutation<SignUpResponseType, SignUpQueryType>({
      query: body => ({
        url: 'sign-up',
        method: 'post',
        body,
      }),
      invalidatesTags: ['SIGNUP'],
    }),
    signIn: builder.mutation<SignInResponseType, SignInQueryType>({
      query: body => ({
        url: 'sign-in',
        method: 'post',
        body,
      }),
      invalidatesTags: ['SIGNIN'],
    }),
    getUsers: builder.query<UserType[], void>({
      query: () => ({
        url: 'users',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }),
      providesTags: ['SIGNUP', 'SIGNIN'],
    }),
    deleteUsers: builder.mutation<{ done: true }, string[]>({
      query: users => ({
        url: 'users',
        method: 'delete',
        body: { users },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUsersMutation,
  useSignUpMutation,
  useAuthCheckQuery,
  useSignInMutation,
} = usersApi;

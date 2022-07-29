import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  AuthCheckResponseType,
  SignInQueryType,
  SignInResponseType,
  SignUpQueryType,
  SignUpResponseType,
  StatusType,
  UserType,
} from './types';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  tagTypes: ['USERS'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://itransition-task4-back.herokuapp.com/',
  }),
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
    }),
    signIn: builder.mutation<SignInResponseType, SignInQueryType>({
      query: body => ({
        url: 'sign-in',
        method: 'post',
        body,
      }),
      invalidatesTags: ['USERS'],
    }),
    getUsers: builder.query<UserType[], void>({
      query: () => ({
        url: 'users',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }),
      providesTags: ['USERS'],
    }),
    deleteUsers: builder.mutation<void, string[]>({
      query: users => ({
        url: 'users',
        method: 'delete',
        body: { users },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
        invalidatesTags: ['USERS'],
      }),
    }),
    setUsersBlock: builder.mutation<UserType[], { users: string[]; status: StatusType }>({
      query: ({ users, status }) => ({
        url: 'users',
        method: 'put',
        body: { users, status },
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
  useSetUsersBlockMutation,
} = usersApi;

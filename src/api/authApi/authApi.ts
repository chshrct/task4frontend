import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  AuthCheckResponseType,
  SignInQueryType,
  SignInResponseType,
  SignUpQueryType,
  SignUpResponseType,
} from './types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: builder => ({
    signIn: builder.mutation<SignInResponseType, SignInQueryType>({
      query: body => ({
        url: 'sign-in',
        method: 'post',
        body,
      }),
    }),
    signUp: builder.mutation<SignUpResponseType, SignUpQueryType>({
      query: body => ({
        url: 'sign-up',
        method: 'post',
        body,
      }),
    }),
    authCheck: builder.query<AuthCheckResponseType, void>({
      query: () => ({
        url: 'auth-check',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
        },
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useAuthCheckQuery } = authApi;

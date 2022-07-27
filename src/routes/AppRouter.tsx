import { FC } from 'react';

import { Navigate, useRoutes } from 'react-router-dom';

import { AppRoutes } from './enum';

import { NotFound } from 'pages/NotFound/NotFound';
import { SignIn } from 'pages/SignIn/SignIn';
import { SignUp } from 'pages/SignUp/SignUp';
import { Users } from 'pages/Users/Users';

export const AppRouter: FC = () => {
  const routes = useRoutes([
    { index: true, element: <Navigate to={AppRoutes.SIGNIN} /> },
    {
      path: AppRoutes.RANDOM,
      element: <Navigate to={AppRoutes.NOT_FOUND} />,
    },
    { path: AppRoutes.NOT_FOUND, element: <NotFound /> },
    { path: AppRoutes.SIGNIN, element: <SignIn /> },
    { path: AppRoutes.SIGNUP, element: <SignUp /> },
    { path: AppRoutes.USERS, element: <Users /> },
  ]);

  return routes;
};

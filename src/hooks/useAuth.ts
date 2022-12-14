import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { AppRoutes } from 'routes';
import { useAppSelector } from 'store';
import { selectIsAuthed } from 'store/authSlice/selectors';

export const useAuth = (currentRoute: any): void => {
  const isUserAuthed = useAppSelector(selectIsAuthed);

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserAuthed && currentRoute !== AppRoutes.USERS) navigate(AppRoutes.USERS);
    if (!isUserAuthed && currentRoute !== AppRoutes.SIGNIN) navigate(AppRoutes.SIGNIN);
  }, [currentRoute, isUserAuthed, navigate]);
};

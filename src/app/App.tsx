import { FC, useEffect } from 'react';

import { useAuthCheckQuery } from 'api/authApi/authApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FullscreenProgress } from 'components/FullscreenProgress/FullscreenProgress';
import { AppRouter } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import './App.css';
import { setIsAppInitialized } from 'store/appSlice/appSlice';
import { setAuthedUser } from 'store/authSlice/authSlice';

const App: FC = () => {
  const isInitialized = useAppSelector(state => state.app.isAppInitialized);
  const { data, isSuccess, isError } = useAuthCheckQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuthedUser({ id: data._id, email: data.email }));
      dispatch(setIsAppInitialized(true));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) dispatch(setIsAppInitialized(true));
  }, [isError]);

  if (!isInitialized) return <FullscreenProgress />;

  return <AppRouter />;
};

export default App;

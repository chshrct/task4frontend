import { FC, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthCheckQuery } from 'api/usersApi/usersApi';
import { FullscreenProgress } from 'components/FullscreenProgress/FullscreenProgress';
import { AppRouter } from 'routes';
import { useAppDispatch } from 'store';
import './App.css';
import { setAuthedUser } from 'store/authSlice/authSlice';

const App: FC = () => {
  const { data, isSuccess, isError, isLoading } = useAuthCheckQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuthedUser({ id: data._id, email: data.email }));
    }
  }, [isSuccess]);

  useEffect(() => {}, [isError]);

  if (isLoading) return <FullscreenProgress />;

  return <AppRouter />;
};

export default App;

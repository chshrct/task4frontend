import { FC, useEffect } from 'react';

import { Alert } from 'react-bootstrap';

import { useAuthCheckQuery } from 'api/usersApi/usersApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FullscreenProgress } from 'components/FullscreenProgress/FullscreenProgress';
import { AppRouter } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { setError } from 'store/appSlice/appSlice';
import { selectError } from 'store/appSlice/selectors';
import { setAuthedUser } from 'store/authSlice/authSlice';
import './App.css';

const errorFadeDelay = 3000;

const App: FC = () => {
  const { data, isSuccess, isLoading } = useAuthCheckQuery();
  const dispatch = useAppDispatch();

  const error = useAppSelector(selectError);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setAuthedUser({ id: data.id, email: data.email }));
    }
  }, [isSuccess]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(setError(''));
    }, errorFadeDelay);

    return () => clearTimeout(timerId);
  }, [error]);

  if (isLoading) return <FullscreenProgress />;

  return (
    <>
      <AppRouter />
      <Alert
        className="position-absolute bottom-0 start-50 translate-middle"
        variant="danger"
        show={!!error}
        onClick={() => dispatch(setError(''))}
      >
        {error}
      </Alert>
    </>
  );
};

export default App;

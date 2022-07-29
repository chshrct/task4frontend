import { useEffect } from 'react';

import { setError } from 'store/appSlice/appSlice';
import { signOut } from 'store/authSlice/authSlice';

// @ts-ignore
export const useSignOutError = (dispatch, isError, error): void => {
  useEffect(() => {
    if (isError) {
      // @ts-ignore
      dispatch(setError(error.data.name));
      dispatch(signOut());
    }
  }, [isError, dispatch, error]);
};

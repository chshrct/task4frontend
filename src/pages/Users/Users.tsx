import { FC, useEffect } from 'react';

import { faTrash, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, ButtonToolbar, Container } from 'react-bootstrap';

import { UsersTable as Table } from './Table/Table';

import {
  useDeleteUsersMutation,
  useGetUsersQuery,
  useSetUsersBlockMutation,
} from 'api/usersApi/usersApi';
import { FullscreenProgress } from 'components/FullscreenProgress/FullscreenProgress';
import { CONSTANT } from 'constant';
import { useAuth } from 'hooks/useAuth';
import { useSignOutError } from 'hooks/useError';
import { AppRoutes } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { setError } from 'store/appSlice/appSlice';
import { signOut } from 'store/authSlice/authSlice';
import { selectId } from 'store/authSlice/selectors';
import { selectSelectedUsers, selectUsers } from 'store/usersSlice/selectors';
import { setUsers } from 'store/usersSlice/usersSlice';

const ACCOUNT_BLOCKED = 'Account was blocked';

export const Users: FC = () => {
  useAuth(AppRoutes.USERS);

  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);
  const selectedUsers = useAppSelector(selectSelectedUsers);
  const controlsDisabled = selectedUsers.length === 0;
  const authedUserId = useAppSelector(selectId);

  const {
    data: getUsersData,
    isLoading: isGetUsersLoading,
    isSuccess: isGetUsersSuccess,
    refetch: refetchUsers,
    isError: isGetUsersError,
    error: getUsersError,
  } = useGetUsersQuery();
  const [
    deleteUsers,
    {
      isSuccess: isDeleteUsersSuccess,
      isError: isDeleteUsersError,
      error: deleteUsersError,
    },
  ] = useDeleteUsersMutation();
  const [
    setUsersBlock,
    {
      data: usersBlockData,
      isSuccess: isSetUsersBlockSuccess,
      isError: isSetUsersBlockError,
      error: setUsersBlockError,
    },
  ] = useSetUsersBlockMutation();

  useSignOutError(dispatch, isSetUsersBlockError, setUsersBlockError);
  useSignOutError(dispatch, isDeleteUsersError, deleteUsersError);
  useSignOutError(dispatch, isGetUsersError, getUsersError);

  useEffect(() => {
    if (isDeleteUsersSuccess) {
      refetchUsers();
    }
  }, [isDeleteUsersSuccess, refetchUsers]);

  useEffect(() => {
    if (isSetUsersBlockSuccess && usersBlockData) {
      dispatch(setUsers(usersBlockData));
      const authedUser = usersBlockData.find(user => user.id === authedUserId);

      if (!authedUser || authedUser.status === CONSTANT.BLOCKED) {
        dispatch(setError(ACCOUNT_BLOCKED));
        dispatch(signOut());
      }
    }
  }, [isSetUsersBlockSuccess]);

  useEffect(() => {
    if (isGetUsersSuccess) {
      dispatch(setUsers(getUsersData));
      const authedUser = getUsersData.find(user => user.id === authedUserId);

      if (!authedUser || authedUser.status === CONSTANT.BLOCKED) dispatch(signOut());
    }
  }, [isGetUsersSuccess]);

  const onSignOutClick = (): void => {
    dispatch(signOut());
  };

  const onDeleteClick = (): void => {
    deleteUsers(selectedUsers);
  };

  const onBlockClick = (): void => {
    setUsersBlock({ status: CONSTANT.BLOCKED, users: selectedUsers });
  };

  const onUnblockClick = (): void => {
    setUsersBlock({ status: CONSTANT.ACTIVE, users: selectedUsers });
  };

  if (isGetUsersLoading) return <FullscreenProgress />;

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="w-75">
        <div className="d-flex w-100 justify-content-between">
          <ButtonToolbar className="mb-3" aria-label="Toolbar with button groups">
            <ButtonGroup className="me-2" aria-label="Second group">
              <Button onClick={onBlockClick} disabled={controlsDisabled} variant="danger">
                Block
              </Button>
              <Button
                onClick={onUnblockClick}
                disabled={controlsDisabled}
                variant="success"
              >
                <FontAwesomeIcon icon={faUnlock} />
              </Button>
              <Button
                onClick={onDeleteClick}
                disabled={controlsDisabled}
                variant="secondary"
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
          <div>
            <Button onClick={onSignOutClick}>Sign Out</Button>
          </div>
        </div>
        <Table users={users} />
      </div>
    </Container>
  );
};

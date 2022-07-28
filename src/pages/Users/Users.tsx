import { FC, useEffect } from 'react';

import { faTrash, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, ButtonToolbar, Container } from 'react-bootstrap';

import { UsersTable as Table } from './Table/Table';

import { useDeleteUsersMutation, useGetUsersQuery } from 'api/usersApi/usersApi';
import { FullscreenProgress } from 'components/FullscreenProgress/FullscreenProgress';
import { useAuth } from 'hooks/useAuth';
import { AppRoutes } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { signOut } from 'store/authSlice/authSlice';
import { deleteUsersStore, setUsers } from 'store/usersSlice/usersSlice';

export const Users: FC = () => {
  useAuth(AppRoutes.USERS);

  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.users);
  const selectedUsers = useAppSelector(state =>
    state.users.users.filter(user => user.selected).map(user => user.id),
  );
  const authedUserId = useAppSelector(state => state.auth.id);

  const {
    data: usersLoaded,
    isLoading: isLoadingUsers,
    isSuccess: isSuccessUsers,
  } = useGetUsersQuery();
  const [deleteUsers, { isSuccess: isSuccessDeleteUsers }] = useDeleteUsersMutation();

  useEffect(() => {
    if (isSuccessDeleteUsers) {
      dispatch(deleteUsersStore(selectedUsers));
      if (selectedUsers.includes(authedUserId)) dispatch(signOut());
    }
  }, [isSuccessDeleteUsers]);

  useEffect(() => {
    if (isSuccessUsers) dispatch(setUsers(usersLoaded));
  }, [usersLoaded, dispatch, isSuccessUsers]);

  if (isLoadingUsers) return <FullscreenProgress />;

  const onSignOutClick = (): void => {
    dispatch(signOut());
  };

  const onDeleteClick = (): void => {
    deleteUsers(selectedUsers);
  };

  const controlsDisabled = selectedUsers.length === 0;

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="w-75">
        <div className="d-flex w-100 justify-content-between">
          <ButtonToolbar className="mb-3" aria-label="Toolbar with button groups">
            <ButtonGroup className="me-2" aria-label="Second group">
              <Button disabled={controlsDisabled}>
                <FontAwesomeIcon icon={faLock} />
              </Button>
              <Button disabled={controlsDisabled}>
                <FontAwesomeIcon icon={faUnlock} />
              </Button>
              <Button onClick={onDeleteClick} disabled={controlsDisabled}>
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

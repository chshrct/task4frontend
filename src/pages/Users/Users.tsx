import { FC, useEffect } from 'react';

import { faTrash, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, ButtonToolbar, Container } from 'react-bootstrap';

import { UsersTable as Table } from './Table/Table';

import { useGetUsersQuery } from 'api/usersApi/usersApi';
import { FullscreenProgress } from 'components/FullscreenProgress/FullscreenProgress';
import { useAuth } from 'hooks/useAuth';
import { AppRoutes } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';
import { signOut } from 'store/authSlice/authSlice';
import { setUsers } from 'store/usersSlice/usersSlice';

export const Users: FC = () => {
  useAuth(AppRoutes.USERS);

  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.users);

  const { data, isLoading, isSuccess } = useGetUsersQuery();

  useEffect(() => {
    if (isSuccess) dispatch(setUsers(data));
  }, [data, dispatch, isSuccess]);

  if (isLoading) return <FullscreenProgress />;

  const onSignOutClick = (): { payload: undefined; type: string } => dispatch(signOut());

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="w-75">
        <div className="d-flex w-100 justify-content-between">
          <ButtonToolbar className="mb-3" aria-label="Toolbar with button groups">
            <ButtonGroup className="me-2" aria-label="Second group">
              <Button>
                <FontAwesomeIcon icon={faLock} />
              </Button>
              <Button>
                <FontAwesomeIcon icon={faUnlock} />
              </Button>
              <Button>
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

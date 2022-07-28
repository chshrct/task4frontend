import { ChangeEventHandler, FC } from 'react';

import { Table } from 'react-bootstrap';

import { TableRow } from './TableRow/TableRow';

import { useAppDispatch } from 'store';
import { UserEntityType } from 'store/usersSlice/types';
import { toggleUsersSelect } from 'store/usersSlice/usersSlice';
import { utcDateToLocal } from 'utils/utcDateToLocal';

type PropsType = {
  users: UserEntityType[];
};

export const UsersTable: FC<PropsType> = ({ users }) => {
  const dispatch = useAppDispatch();
  const onUsersCheckBoxChange: ChangeEventHandler<HTMLInputElement> = e =>
    dispatch(toggleUsersSelect(e.target.checked));

  return (
    <Table bordered hover responsive>
      <thead>
        <tr>
          <th>
            <input type="checkbox" onChange={onUsersCheckBoxChange} />
          </th>
          <th>#</th>
          <th>name</th>
          <th>email</th>
          <th>reg date</th>
          <th>login date</th>
          <th>status</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          return (
            <TableRow
              key={user.id}
              email={user.email}
              id={user.id}
              checked={user.selected}
              logDate={utcDateToLocal(user.logDate)}
              name={user.name}
              regDate={utcDateToLocal(user.regDate)}
              status={user.status}
            />
          );
        })}
      </tbody>
    </Table>
  );
};

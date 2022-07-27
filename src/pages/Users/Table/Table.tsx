import React, { FC } from 'react';

import { Table } from 'react-bootstrap';

import { TableRow } from './TableRow/TableRow';

export const UsersTable: FC = () => {
  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
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
        <TableRow
          email="ya@gmail.com"
          id="5d78sa5f87afd"
          isSelected
          logDate="25-2-2011"
          name="Boris"
          regDate="87-2-2022"
          status="active"
        />
        <TableRow
          email="312@gmail.com"
          id="asdfafd"
          isSelected={false}
          logDate="24-2-2011"
          name="Alesha"
          regDate="11-2-2097"
          status="blocked"
        />
        <TableRow
          email="hoho@gmail.com"
          id="aadffvcv"
          isSelected
          logDate="25-2-2011"
          name="Vadik"
          regDate="87-2-2022"
          status="active"
        />
        <TableRow
          email="gadsf@gmail.com"
          id="qwefasdfaf"
          isSelected
          logDate="25-2-2011"
          name="Galya"
          regDate="87-2-2022"
          status="active"
        />
      </tbody>
    </Table>
  );
};

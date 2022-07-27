import { FC } from 'react';

import { Container } from 'react-bootstrap';

import { UsersTable as Table } from './Table/Table';

export const Users: FC = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="w-75">
        <Table />
      </div>
    </Container>
  );
};

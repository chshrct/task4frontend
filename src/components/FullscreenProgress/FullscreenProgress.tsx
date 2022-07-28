import React, { FC } from 'react';

import { Container } from 'react-bootstrap';

import { ReactComponent as Loader } from 'assets/loaders/fullLoader.svg';

export const FullscreenProgress: FC = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <Loader />
    </Container>
  );
};

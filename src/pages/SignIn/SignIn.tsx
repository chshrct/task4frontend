import { FC } from 'react';

import { Button, Container, Form, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { AppRoutes } from 'routes';

export const SignIn: FC = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="w-75" style={{ maxWidth: '400px' }}>
        <Form>
          <Stack gap={2}>
            <Form.Group controlId="email">
              <Form.Label>Enter email</Form.Label>
              <Form.Control type="email" placeholder="example@email.com" />
              <Form.Text>We are not gonna share ur email</Form.Text>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Enter password</Form.Label>
              <Form.Control type="password" placeholder="password" />
              <Form.Text>We are not gonna share ur password</Form.Text>
            </Form.Group>
            <Button className="mt-2" type="submit" variant="primary">
              SignIn
            </Button>
          </Stack>
        </Form>
      </div>
      <p className="mt-3">
        If u dont have an account, u can{' '}
        <Link className="link-primary" to={AppRoutes.SIGNUP}>
          SignUp
        </Link>{' '}
        here!
      </p>
    </Container>
  );
};

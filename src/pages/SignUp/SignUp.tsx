import { FC } from 'react';

import { Button, Container, Form, Stack } from 'react-bootstrap';

export const SignUp: FC = () => {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <Form className="w-75" style={{ maxWidth: '400px' }}>
        <Stack gap={2}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Alesha Popovich" />
            <Form.Text>We are not gonna share ur name</Form.Text>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="exapmle@email.com" />
            <Form.Text>We are not gonna share ur email</Form.Text>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="123Qeqda6sd9fdsa" />
            <Form.Text>We are not gonna share ur password</Form.Text>
          </Form.Group>
          <Form.Group controlId="cpassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" placeholder="123Qeqda6sd9fdsa" />
            <Form.Text>We are not gonna share ur password</Form.Text>
          </Form.Group>
          <Button className="mt-2" type="submit" variant="primary">
            SignUp
          </Button>
        </Stack>
      </Form>
    </Container>
  );
};

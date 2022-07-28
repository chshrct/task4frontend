import { FC, useEffect } from 'react';

import { useFormik } from 'formik';
import { Button, Container, Form, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useSignUpMutation } from 'api/usersApi/usersApi';
import { AppRoutes } from 'routes';

export const SignUp: FC = () => {
  const [
    signUp,
    { data: signUpData, isLoading: signUpIsLoading, isSuccess: isSignUpSuccess },
  ] = useSignUpMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSignUpSuccess && signUpData) navigate(AppRoutes.SIGNIN);
  }, [isSignUpSuccess]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validate: ({ name, email, password, cpassword }) => {
      const errors = {} as {
        name: string;
        email: string;
        password: string;
        cpassword: string;
      };

      if (!name) errors.name = 'Required';
      if (!password) errors.password = 'Required';
      if (!cpassword) {
        errors.cpassword = 'Required';
      } else if (password !== cpassword) errors.cpassword = 'Passwords do not match';
      if (!email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = 'Invalid email address';
      }

      return errors;
    },
    onSubmit: ({ name, email, password }) => {
      signUp({ email, name, password });
    },
  });

  const isSubmitDisabled =
    !!formik.errors.name ||
    !!formik.errors.email ||
    !!formik.errors.password ||
    !!formik.errors.cpassword ||
    !formik.values.name ||
    !formik.values.email ||
    !formik.values.password ||
    !formik.values.cpassword ||
    signUpIsLoading;

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <Form onSubmit={formik.handleSubmit} className="w-75" style={{ maxWidth: '400px' }}>
        <Stack gap={2}>
          <Form.FloatingLabel controlId="name" label="name" className="mb-3">
            <Form.Control
              type="name"
              placeholder="Alesha Popovich"
              disabled={signUpIsLoading}
              {...formik.getFieldProps('name')}
            />
            <div style={{ height: '20px' }}>
              {formik.touched.name && formik.errors.name ? (
                <Form.Text className="text-danger">{formik.errors.name}</Form.Text>
              ) : null}
            </div>
          </Form.FloatingLabel>
          <Form.FloatingLabel controlId="email" label="email" className="mb-3">
            <Form.Control
              type="email"
              placeholder="exapmle@email.com"
              disabled={signUpIsLoading}
              {...formik.getFieldProps('email')}
            />
            <div style={{ height: '20px' }}>
              {formik.touched.email && formik.errors.email ? (
                <Form.Text className="text-danger">{formik.errors.email}</Form.Text>
              ) : null}
            </div>
          </Form.FloatingLabel>
          <Form.FloatingLabel controlId="password" label="password" className="mb-3">
            <Form.Control
              type="password"
              placeholder="123Qeqda6sd9fdsa"
              disabled={signUpIsLoading}
              {...formik.getFieldProps('password')}
            />
            <div style={{ height: '20px' }}>
              {formik.touched.password && formik.errors.password ? (
                <Form.Text className="text-danger">{formik.errors.password}</Form.Text>
              ) : null}
            </div>
          </Form.FloatingLabel>
          <Form.FloatingLabel
            controlId="cpassword"
            label="confirm password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              placeholder="123Qeqda6sd9fdsa"
              disabled={signUpIsLoading}
              {...formik.getFieldProps('cpassword')}
            />
            <div style={{ height: '20px' }}>
              {formik.touched.cpassword && formik.errors.cpassword ? (
                <Form.Text className="text-danger">{formik.errors.cpassword}</Form.Text>
              ) : null}
            </div>
          </Form.FloatingLabel>
          <Button
            className="mt-2"
            type="submit"
            variant="primary"
            disabled={isSubmitDisabled}
          >
            SignUp
          </Button>
        </Stack>
      </Form>
      <p className="mt-3">
        If u have an account, u can{' '}
        <Link className="link-primary" to={AppRoutes.SIGNIN}>
          Sign In
        </Link>{' '}
        here!
      </p>
    </Container>
  );
};

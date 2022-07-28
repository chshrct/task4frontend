import { FC, useEffect } from 'react';

import { useFormik } from 'formik';
import { Button, Container, Form, Stack } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { useSignInMutation } from 'api/authApi/authApi';
import { useAuth } from 'hooks/useAuth';
import { AppRoutes } from 'routes';
import { useAppDispatch } from 'store';
import { setAuthedUser } from 'store/authSlice/authSlice';

export const SignIn: FC = () => {
  useAuth(AppRoutes.SIGNIN);

  const [
    signIn,
    { data: loginData, isSuccess: isLoginSuccess, isLoading: loginIsLoading },
  ] = useSignInMutation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoginSuccess && loginData) {
      const { email, id, token } = loginData;

      localStorage.setItem('token', token);
      dispatch(setAuthedUser({ id, email }));
    }
  }, [isLoginSuccess, loginData, navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: ({ email, password }) => {
      const errors = {} as { email: string; password: string };

      if (!email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = 'Invalid email address';
      }

      if (!password) errors.password = 'Required';

      return errors;
    },
    onSubmit: ({ email, password }) => {
      signIn({ email, password });
    },
  });

  const isSubmitDisabled =
    !!formik.errors.email ||
    !!formik.errors.password ||
    loginIsLoading ||
    !formik.values.email ||
    !formik.values.password;

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="w-75" style={{ maxWidth: '400px' }}>
        <Form onSubmit={formik.handleSubmit}>
          <Stack gap={2}>
            <Form.FloatingLabel controlId="email" label="Email address" className="mb-3">
              <Form.Control
                type="email"
                placeholder="name@example.com"
                disabled={loginIsLoading}
                {...formik.getFieldProps('email')}
              />
              <div style={{ height: '20px' }}>
                {formik.touched.email && formik.errors.email ? (
                  <Form.Text className="text-danger">{formik.errors.email}</Form.Text>
                ) : null}
              </div>
            </Form.FloatingLabel>
            <Form.FloatingLabel controlId="password" label="Password" className="mb-3">
              <Form.Control
                type="password"
                placeholder="*********"
                disabled={loginIsLoading}
                {...formik.getFieldProps('password')}
              />
              <div style={{ height: '20px' }}>
                {formik.touched.password && formik.errors.password ? (
                  <Form.Text className="text-danger">{formik.errors.password}</Form.Text>
                ) : null}
              </div>
            </Form.FloatingLabel>
            <Button
              type="submit"
              className="mt-2"
              variant="primary"
              disabled={isSubmitDisabled}
            >
              Sign In
            </Button>
          </Stack>
        </Form>
      </div>
      <p className="mt-3">
        If u dont have an account, u can{' '}
        <Link className="link-primary" to={AppRoutes.SIGNUP}>
          Sign Up
        </Link>{' '}
        here!
      </p>
    </Container>
  );
};

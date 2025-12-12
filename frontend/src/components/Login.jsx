import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../services/auth.js';
import { loginRequest, signupRequest } from '../services/auth.js';
import {
  Form as BootstrapForm,
  Button,
  Alert,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function AuthForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const initialIsLogin = location.pathname === '/login';
  const [isLogin, setIsLogin] = useState(initialIsLogin);

  useEffect(() => {
    setIsLogin(location.pathname === '/login');
  }, [location.pathname]);

  if (token) {
    return <Navigate to="/" replace />;
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('errors.requiredField'))
      .min(3, t('errors.usernameLength'))
      .max(20, t('errors.usernameLength')),
    password: Yup.string()
      .required(t('errors.requiredField'))
      .min(6, t('errors.passwordLength')),
    confirmPassword: Yup.string().when('password', (password, schema) =>
      !isLogin
        ? schema
            .required(t('errors.requiredPassword'))
            .oneOf([Yup.ref('password')], t('auth.passwordMismatch'))
        : schema
    ),
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="mb-4">
            {isLogin ? t('auth.loginTitle') : t('auth.signupTitle')}
          </h1>
          <Formik
            initialValues={{ username: '', password: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
              try {
                let data;
                if (isLogin) {
                  data = await loginRequest({
                    username: values.username,
                    password: values.password,
                  });
                } else {
                  data = await signupRequest({
                    username: values.username,
                    password: values.password,
                  });
                }
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                dispatch(loginUser.fulfilled(data));
                navigate('/');
              } catch (err) {
                if (!isLogin && err.response?.status === 409) {
                  setStatus({
                    authError: t('errors.usernameAlready'),
                  });
                } else {
                  setStatus({
                    authError: t('errors.nameOrPassword'),
                  });
                }
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              status,
              isSubmitting,
              errors,
              touched,
            }) => (
              <BootstrapForm onSubmit={handleSubmit}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label></BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={touched.username && !!errors.username}
                    placeholder={isLogin ? t('auth.usernameEnter') : t('auth.usernameLabel')}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.username}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label></BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={touched.password && !!errors.password}
                    placeholder={t('auth.passwordEnter')}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.password}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                {!isLogin && (
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label></BootstrapForm.Label>
                    <BootstrapForm.Control
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      isInvalid={
                        touched.confirmPassword && !!errors.confirmPassword
                      }
                      placeholder={t('auth.confirmPasswordLabel')}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>
                )}

                {status?.authError && (
                  <Alert variant="danger">{status.authError}</Alert>
                )}

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  {isLogin ? t('auth.loginButton') : t('auth.signupButton')}
                </Button>
                <Button
                  variant="link"
                  type="button"
                  onClick={() => {
                    navigate(isLogin ? '/signup' : '/login');
                  }}
                  disabled={isSubmitting}
                >
                  {isLogin ? t('auth.toggleToSignup') : t('auth.toggleToLogin')}
                </Button>
              </BootstrapForm>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, loginRequest, signupRequest } from '../services/auth.js';
import { Alert, Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function AuthForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const token = localStorage.getItem('token');
  if (token) return <Navigate to="/" replace />;

  const isLogin = location.pathname === '/login';

  const signupSchema = Yup.object().shape({
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

  const loginSchema = Yup.object().shape({
    username: Yup.string().required(t('errors.pass')),
    password: Yup.string().required(t('errors.pass')),
  });

  const validationSchema = isLogin ? loginSchema : signupSchema;


  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <div className="card shadow-sm">
            {/* CARD BODY */}
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              {/* Avatar */}
              <div className="mb-4 mb-md-0 d-flex align-items-center justify-content-center">
                <img
                  src={
                    isLogin
                      ? '/src/assets/avatar-DIE1AEpS.jpg'
                      : '/src/assets/avatar_1-D7Cot-zE.jpg'
                  }
                  className="rounded-circle"
                  alt={isLogin ? 'Войти' : 'Регистрация'}
                  style={{
                    width: '150px',
                    height: '150px',
                    objectFit: 'cover',
                  }}
                />
              </div>

              {/* FORM */}
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
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
                      setStatus({ authError: t('errors.usernameAlready') });
                    } else {
                      setStatus({ authError: t('errors.nameOrPassword') });
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
                  <div className={isLogin ? 'w-100 mt-3 mt-md-0' : 'w-50'}>
                    <form onSubmit={handleSubmit}>
                      <h1 className="text-center mb-4">
                        {isLogin ? t('auth.loginTitle') : t('auth.signupTitle')}
                      </h1>

                      {/* Username */}
                      <div className="form-floating mb-3">
                        <input
                          type="text"
                          name="username"
                          id="username"
                          value={values.username}
                          onChange={handleChange}
                          className={`form-control ${
                            touched.username && errors.username
                              ? 'is-invalid'
                              : ''
                          }`}
                          placeholder={
                            isLogin
                              ? t('auth.usernameEnter')
                              : t('auth.usernameLabel')
                          }
                        />
                        <label htmlFor="username">
                          {isLogin
                            ? t('auth.usernameEnter')
                            : t('auth.usernameLabel')}
                        </label>
                        <div className="invalid-tooltip">{errors.username}</div>
                      </div>

                      {/* Password */}
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          name="password"
                          id="password"
                          value={values.password}
                          onChange={handleChange}
                          className={`form-control ${
                            touched.password && errors.password
                              ? 'is-invalid'
                              : ''
                          }`}
                          placeholder={t('auth.passwordEnter')}
                        />
                        <label htmlFor="password">
                          {t('auth.passwordEnter')}
                        </label>
                        <div className="invalid-tooltip">{errors.password}</div>
                      </div>

                      {/* Confirm Password (Signup only) */}
                      {!isLogin && (
                        <div className="form-floating mb-4">
                          <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            className={`form-control ${
                              touched.confirmPassword && errors.confirmPassword
                                ? 'is-invalid'
                                : ''
                            }`}
                            placeholder={t('auth.confirmPasswordLabel')}
                          />
                          <label htmlFor="confirmPassword">
                            {t('auth.confirmPasswordLabel')}
                          </label>
                          <div className="invalid-tooltip">
                            {errors.confirmPassword}
                          </div>
                        </div>
                      )}

                      {/* Errors */}
                      {status?.authError && (
                        <Alert variant="danger">{status.authError}</Alert>
                      )}

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-100 mb-3 btn btn-outline-primary"
                        disabled={isSubmitting}
                      >
                        {isLogin
                          ? t('auth.loginButton')
                          : t('auth.signupButton')}
                      </button>
                    </form>
                  </div>
                )}
              </Formik>
            </div>

            {/* CARD FOOTER (Login only) */}
            {isLogin && (
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('auth.notAccount')}</span>{' '}
                  <Button
                    variant="link"
                    type="button"
                    onClick={() => navigate('/signup')}
                  >
                    {t('auth.signupTitle')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

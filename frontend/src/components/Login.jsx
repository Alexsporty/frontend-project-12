import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Navigate } from 'react-router-dom';
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

export default function AuthForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const [isLogin, setIsLogin] = useState(true);

  if (token) {
    return <Navigate to="/" replace />;
  }

  const toggleMode = () => setIsLogin(!isLogin);

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Имя пользователя обязательно')
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов'),
    password: Yup.string()
      .required('Пароль обязателен')
      .min(6, 'Минимум 6 символов'),
    confirmPassword: Yup.string().when('password', (password, schema) =>
      !isLogin
        ? schema
            .required('Подтверждение пароля обязательно')
            .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
        : schema
    ),
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="mb-4">{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
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
                    authError: 'Пользователь с таким именем уже существует',
                  });
                } else {
                  setStatus({
                    authError:
                      'Ошибка: проверьте логин/пароль или попробуйте другое имя',
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
                  <BootstrapForm.Label>Имя пользователя</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={touched.username && !!errors.username}
                    placeholder="Введите имя пользователя"
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.username}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Пароль</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={touched.password && !!errors.password}
                    placeholder="Введите пароль"
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.password}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                {!isLogin && (
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>
                      Подтвердите пароль
                    </BootstrapForm.Label>
                    <BootstrapForm.Control
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      isInvalid={
                        touched.confirmPassword && !!errors.confirmPassword
                      }
                      placeholder="Повторите пароль"
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
                  {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </Button>
                <Button
                  variant="link"
                  type="button"
                  onClick={toggleMode}
                  disabled={isSubmitting}
                >
                  {isLogin ? 'Создать аккаунт' : 'Уже есть аккаунт? Войти'}
                </Button>
              </BootstrapForm>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}

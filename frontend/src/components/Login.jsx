import React, { useState } from 'react';
import { Formik } from 'formik';
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

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="mb-4">{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
          <Formik
            initialValues={{ username: '', password: '', confirmPassword: '' }}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
              try {
                let data;
                if (isLogin) {
                  data = await loginRequest({ username: values.username, password: values.password });
                } else {
                  if (values.password !== values.confirmPassword) {
                    setStatus({ authError: 'Пароли не совпадают' });
                    setSubmitting(false);
                    return;
                  }
                  data = await signupRequest({ username: values.username, password: values.password });
                }
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                dispatch(loginUser.fulfilled(data));
                navigate('/');
              } catch (err) {
                setStatus({ authError: 'Ошибка: проверьте логин/пароль или попробуйте другое имя' });
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, handleChange, handleSubmit, status, isSubmitting }) => (
              <BootstrapForm onSubmit={handleSubmit}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Имя пользователя</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    placeholder="Введите имя пользователя"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Пароль</BootstrapForm.Label>
                  <BootstrapForm.Control
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Введите пароль"
                  />
                </BootstrapForm.Group>

                {!isLogin && (
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Подтвердите пароль</BootstrapForm.Label>
                    <BootstrapForm.Control
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      placeholder="Повторите пароль"
                    />
                  </BootstrapForm.Group>
                )}

                {status?.authError && <Alert variant="danger">{status.authError}</Alert>}

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

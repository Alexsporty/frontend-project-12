import React from 'react';
import { Formik } from 'formik';
import { useNavigate, Navigate } from 'react-router-dom';
import { loginRequest } from '../services/auth.js';
import {
  Form as BootstrapForm,
  Button,
  Alert,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

function Login() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="mb-4">Авторизация</h1>
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
              try {
                const data = await loginRequest(values);
                localStorage.setItem('token', data.token);
                navigate('/');
              } catch (err) {
                setStatus({ authError: 'Неверный логин или пароль' });
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

                {status?.authError && (
                  <Alert variant="danger">{status.authError}</Alert>
                )}

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Войти
                </Button>
              </BootstrapForm>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
export default Login;

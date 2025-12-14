import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Login from './Login';
import NotFound from './NotFound';
import ProtectedRoute from '../ProtectedRoute';
import Header from './Header';
import ChatGroup from './ChatGroup';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { loginUser } from '../services/auth';

const App = () => {
  const dispatch = useDispatch();

  // 🔑 автологин при старте приложения
  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (token && username) {
      dispatch(loginUser.fulfilled({ token, username }));
    }
  }, [dispatch]);

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ChatGroup />
              </ProtectedRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Login isSignup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastContainer
    position="top-right"
    autoClose={3000}
    closeOnClick
    pauseOnHover
  />
    </>
  );
};

export default App;

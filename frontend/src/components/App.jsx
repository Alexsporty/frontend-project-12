import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import NotFound from './NotFound';
import ProtectedRoute from '../ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const App = () => {
  return (
    <>
    <button
  onClick={() => {
    setTimeout(() => {
      throw new Error('Production Rollbar async test error');
    });
  }}
>
  Test Rollbar Error
</button>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <ToastContainer position="top-right" autoClose={3000}/>
    </>
  );
};

export default App;

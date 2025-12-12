import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import NotFound from './NotFound';
import ProtectedRoute from '../ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

const App = () => {
  return (
    <>
    <Header />
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
      <Route path="/signup" element={<Login isSignup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <ToastContainer position="top-right" autoClose={3000}/>
    </>
  );
};

export default App;

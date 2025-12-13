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
    <div className="d-flex flex-column h-100">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        pauseOnHover
      />
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
      </div>
    </>
  );
};

export default App;

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated)
  console.log(isLoggedIn);
  const handleExit = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Hexlet Chat
        </a>
        {isLoggedIn && (
        <button onClick={handleExit} type="button" className="btn btn-primary">
          {t('auth.logoutButton')}
        </button>
        )}
      </div>
    </nav>
  );
}

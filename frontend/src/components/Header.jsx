import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleExit = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Hexlet Chat
        </a>
        <button onClick={handleExit} type="button" className="btn btn-primary">
          Выйти
        </button>
      </div>
    </nav>
  );
}

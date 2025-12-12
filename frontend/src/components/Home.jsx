import ChatGroup from './ChatGroup';
import { useDispatch } from 'react-redux';
import { loginUser } from '../services/auth';
import { useEffect } from 'react';

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      dispatch(loginUser.fulfilled({ token, username }));
    }
  }, [dispatch]);

  return (
    <div className="d-flex flex-column h-100">
      <ChatGroup />
    </div>
  );
}

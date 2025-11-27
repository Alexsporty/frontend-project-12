import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initData } from '../services/chat';
import Header from './Header';

export default function Home() {
  const { channels, messages, status, currentChannelId, error } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch();
console.log(channels);
//   if (status === 'loading') {
//     return <h1>Загрузка...</h1>;
//   }
//   if (status === 'failed') {
//     return <h1>Ошибка загрузки{error}</h1>;
//   }

  useEffect(() => {
    dispatch(initData());
  }, [dispatch]);

  return (
    <div>
        <Header />
      <h1>Главная</h1>
    </div>
  );
}

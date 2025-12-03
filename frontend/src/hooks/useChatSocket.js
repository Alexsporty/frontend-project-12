import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addChannel, addMessage } from '../features/chat/chatSlice';
import { initSocket } from '../socket';

export default function useChatSocket(token) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    const socket = initSocket(token);

    const handleNewMessage = (msg) => dispatch(addMessage(msg));
    const handleNewChannel = (channel) => dispatch(addChannel(channel));

    socket.on('newMessage', handleNewMessage);
    socket.on('newChannel', handleNewChannel);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.disconnect();
    };
  }, [dispatch, token]);
}

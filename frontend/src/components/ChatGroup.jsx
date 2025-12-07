import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  initData,
  sendMessage,
  sendChannels,
  removeChannel,
  renameChannel,
} from '../services/chat';
import useChatSocket from '../hooks/useChatSocket';
import AddChannelsModal from './AddChannelModal';
import RenameChannelsModal from './RenameChannelModal';
import { setCurrentChannel } from '../features/chat/chatSlice';

export default function ChatGroup() {
  const { channels, messages, currentChannelId, status } = useSelector(
    (state) => state.chat
  );
  const { username, token } = useSelector((state) => state.auth);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [channelToRename, setChannelToRename] = useState(null);

  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  useChatSocket(token);

  useEffect(() => {
    if (!token) return;
    dispatch(initData()).then((action) => {
      const firstChannelId = action.payload?.channels?.[0]?.id;
      if (firstChannelId) {
        dispatch(setCurrentChannel(firstChannelId));
      }
    });
  }, [dispatch, token]);

  if (status === 'loading') {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return <b>Ошибка загрузки данных</b>;
  }

  const getChannelButtonClass = (channelId, currentChannelId) => {
    return `w-100 rounded-0 text-start btn ${
      channelId === currentChannelId ? 'btn-secondary' : 'btn-light'
    }`;
  };

  const countMessages = () => {
    return messages.filter((msg) => msg.channelId === currentChannelId).length;
  };
  const selectedChannel = () => {
    return channels.find((c) => c.id === currentChannelId)?.name;
  };

  const onRemove = (id) => {
    dispatch(removeChannel({ id }));
  };

  const handleOpen = () => setIsAddModalOpen(true);
  const handleClose = () => setIsAddModalOpen(false);
  const handleAddChannel = (name) => {
    dispatch(sendChannels({ name, removable: true }));
    handleClose();
  };

  const handleOpenRename = (channel) => {
    setChannelToRename(channel);
    setIsRenameModalOpen(true);
  };
  const handleCloseRename = () => {
    setIsRenameModalOpen(false);
    setChannelToRename(null);
  };
  const handleRenameChannel = (newName) => {
    if (!channelToRename) return;
    dispatch(renameChannel({ id: channelToRename.id, name: newName }));
    handleCloseRename();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    dispatch(
      sendMessage({
        body: message,
        channelId: currentChannelId,
        username,
      })
    );
    setMessage('');
  };
  console.log(channels);
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button
              onClick={handleOpen}
              type="button"
              className="p-0 text-primary btn btn-group-vertical"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-plus-square"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul
            id="channels-box"
            className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
          >
            {channels.map((group) => (
              <li className="nav-item w-100" key={group.id}>
                <div className="btn-group w-100" role="group">
                  <button
                    onClick={() => dispatch(setCurrentChannel(group.id))}
                    type="button"
                    className={getChannelButtonClass(
                      group.id,
                      currentChannelId
                    )}
                  >
                    <span className="me-1">#</span>
                    {group.name}
                  </button>
                  {group.removable && (
                    <button
                      type="button"
                      className={`btn dropdown-toggle dropdown-toggle-split${getChannelButtonClass(
                        group.id,
                        currentChannelId
                      )} rounded-end`}
                      data-bs-toggle="dropdown"
                    >
                      <span className="visually-hidden">
                        Управление каналом
                      </span>
                    </button>
                  )}
                  {group.removable && (
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => handleOpenRename(group)}
                        >
                          Переименовать
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => onRemove(group.id)}
                        >
                          Удалить
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b># {selectedChannel()}</b>
              </p>
              <span className="text-muted"> {countMessages()} сообщений</span>
            </div>
            <div
              id="messages-box"
              className="chat-messages overflow-auto px-5 "
            >
              {messages
                .filter((msg) => msg.channelId === currentChannelId)
                .map((msg) => (
                  <div key={msg.id} className="text-break mb-2">
                    <b>{msg.username}</b>:{msg.body}
                  </div>
                ))}
            </div>
            <div className="mt-auto px-5 py-3">
              <form
                onSubmit={handleSubmit}
                noValidate=""
                className="py-1 border rounded-2"
              >
                <div className="input-group has-validation">
                  <input
                    name="body"
                    onChange={(e) => setMessage(e.target.value)}
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2 form-control"
                    value={message}
                  />
                  <button
                    type="submit"
                    disabled=""
                    className="btn btn-group-vertical"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-right-square"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                      ></path>
                    </svg>
                    <span className="visually-hidden">Отправить</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="Toastify"></div>
      <div>
        {isAddModalOpen && (
          <AddChannelsModal
            isOpen={isAddModalOpen}
            onClose={handleClose}
            onSubmit={handleAddChannel}
          />
        )}
      </div>
      <div>
        {isRenameModalOpen && (
          <RenameChannelsModal
            isOpen={isRenameModalOpen}
            onClose={handleCloseRename}
            onSubmit={handleRenameChannel}
            channel={channelToRename}
          />
        )}
      </div>
    </div>
  );
}

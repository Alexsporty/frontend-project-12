import { useState } from 'react';

export default function AddChannelsModal(props) {
  const { isOpen, onClose, onSubmit } = props;

  if (!isOpen) return null;
  
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
    setName('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fade modal show"
      tabIndex="-1"
      style={{ display: 'block' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">Добавить канал</div>
            <button
              onClick={onClose}
              type="button"
              aria-label="Close"
              data-bs-dismiss="modal"
              className="btn btn-close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit} className="">
              <div>
                <input
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  id="name"
                  className="mb-2 form-control"
                  value={name}
                />
                <label className="visually-hidden" htmlFor="name">
                  Имя канала
                </label>
                <div className="invalid-feedback"></div>
                <div className="d-flex justify-content-end">
                  <button
                    onClick={onClose}
                    type="button"
                    className="me-2 btn btn-secondary"
                  >
                    Отменить
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Отправить
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

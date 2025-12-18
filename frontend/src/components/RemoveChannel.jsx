/* eslint-disable react/prop-types */
import React from 'react'

export default function RemoveChannelModal({ onClose, onConfirm }) {
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
            <div className="modal-title h4">Удалить канал</div>
            <button
              type="button"
              aria-label="Close"
              className="btn btn-close"
              onClick={onClose}
            />
          </div>

          <div className="modal-body">
            <p className="lead">Уверены?</p>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={onClose}
              >
                Отменить
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={onConfirm}
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

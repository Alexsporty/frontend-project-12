import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { sendChannels } from '../services/chat';
import { setCurrentChannel } from '../features/chat/chatSlice';
import { useTranslation } from 'react-i18next';

export default function AddChannelsModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.chat.channels);

  if (!isOpen) return null;

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t('errors.channelLength'))
      .max(20, t('errors.channelLength'))
      .test(
        'unique',
        t('errors.channelAlready'),
        (value) => !channels.some((c) => c.name === value)
      )
      .required(t('newChannel.nameChannel')),
  });

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
            <div className="modal-title h4">{t('newChannel.addChannel')}</div> 
            <button
              onClick={onClose}
              type="button"
              aria-label="Close"
              className="btn btn-close"
            />
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{ name: '' }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                  const newChannel = await dispatch(
                    sendChannels({ name: values.name })
                  ).unwrap();
                  if (newChannel?.id) {
                    dispatch(setCurrentChannel(newChannel.id));
                  }
                  onClose();
                } catch (err) {
                  setErrors({
                    name: err.message || t('errors.failedAddChannel'),
                  });
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                isSubmitting,
              }) => (
                <BootstrapForm onSubmit={handleSubmit}>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder={t('newChannel.nameChannel')}
                      isInvalid={!!errors.name}
                    />
                    <BootstrapForm.Control.Feedback type="invalid">
                      {errors.name}
                    </BootstrapForm.Control.Feedback>
                  </BootstrapForm.Group>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="secondary"
                      className="me-2"
                      onClick={onClose}
                    >
                      {t('newChannel.cancel')}
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                    >
                      {t('newChannel.create')}
                    </Button>
                  </div>
                </BootstrapForm>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

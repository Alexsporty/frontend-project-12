import { Formik } from 'formik'
import { Button, Form as BootstrapForm } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { sendChannels } from '../services/chat'
import { setCurrentChannel } from '../features/chat/chatSlice'
import { addChannelSchema } from '../shemas/addChannel'
import { useTranslation } from 'react-i18next'
import leoProfanity from 'leo-profanity'
leoProfanity.add(leoProfanity.getDictionary('ru'))
leoProfanity.add(leoProfanity.getDictionary('en'))

export default function AddChannelsModal({ isOpen, onClose }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const channels = useSelector(state => state.chat.channels)

  const censorNameChannel = (value) => {
    const cleaned = leoProfanity.clean(value)
    return cleaned !== value ? '*'.repeat(value.length) : value
  }

  if (!isOpen) return null

  const validate = addChannelSchema(t, channels)

  return (
    <>
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
                validationSchema={validate}
                onSubmit={async (values, { setSubmitting, setErrors }) => {
                  const channelName = censorNameChannel(values.name)
                  const newChannel = await dispatch(
                    sendChannels({ name: channelName, removable: true }),
                  ).unwrap()
                  try {
                    if (newChannel?.id) {
                      dispatch(setCurrentChannel(newChannel.id))
                    }
                    onClose()
                  }
                  catch (err) {
                    setErrors({
                      name: err.message || t('errors.failedAddChannel'),
                    })
                  }
                  finally {
                    setSubmitting(false)
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
                        id="name"
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                      />
                      <label className="visually-hidden" htmlFor="name">
                        Имя канала
                      </label>
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
    </>
  )
}

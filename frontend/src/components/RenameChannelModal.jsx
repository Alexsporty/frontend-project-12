import { Formik } from 'formik'
import { Button, Form as BootstrapForm } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { renameChannel } from '../services/chat'
import { useTranslation } from 'react-i18next'
import leoProfanity from 'leo-profanity'
import { renameChannelSchema } from '../shemas/renameChannelSchema'
leoProfanity.add(leoProfanity.getDictionary('ru'))
leoProfanity.add(leoProfanity.getDictionary('en'))

export default function RenameChannelsModal({ isOpen, onClose, channel }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const channels = useSelector(state => state.chat.channels)

  if (!isOpen || !channel) return null

  const censorChannelName = (value) => {
    const cleaned = leoProfanity.clean(value)
    return cleaned !== value ? '*'.repeat(value.lenght) : value
  }
  const validate = renameChannelSchema(t, channels, channel.id)

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    const renameCensor = censorChannelName(values.name)
    try {
      await dispatch(
        renameChannel({ id: channel.id, name: renameCensor }),
      ).unwrap()
      onClose()
    }
    catch (err) {
      setErrors({
        name: err.message || t('errors.failedRenameChannel'),
      })
    }
    finally {
      setSubmitting(false)
    }
  }

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
            <div className="modal-title h4">{t('renameChannel.rename')}</div>
            <button
              onClick={onClose}
              type="button"
              aria-label="Close"
              className="btn btn-close"
            />
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{ name: channel.name }}
              enableReinitialize
              validationSchema={validate}
              onSubmit={onSubmit}
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
  )
}

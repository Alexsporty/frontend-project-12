import * as Yup from 'yup'

export const addChannelSchema = (t, channels) =>
  Yup.object({
    name: Yup.string()
      .test(
        'length',
        t('errors.channelLength'),
        value => value && value.length >= 3 && value.length <= 20,
      )
      .test(
        'unique',
        t('errors.channelAlready'),
        value => !channels.some(c => c.name === value),
      )
      .required(t('errors.requiredField')),
  })

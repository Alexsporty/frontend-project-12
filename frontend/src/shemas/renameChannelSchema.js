import * as Yup from 'yup'

export const renameChannelSchema = (t, channels, currentChannelId = null) =>
  Yup.object({
    name: Yup.string()
      .min(3, t('errors.channelLength'))
      .max(20, t('errors.channelLength'))
      .test(
        'unique',
        t('errors.channelAlready'),
        (value) =>
          !channels.some((c) => c.name === value && c.id !== currentChannelId),
      )
      .required(t('errors.requiredField')),
  })

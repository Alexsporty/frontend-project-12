import * as Yup from 'yup'

export const signupSchema = (t, isLogin) =>
  Yup.object().shape({
    username: Yup.string()
      .required(t('errors.requiredField'))
      .min(3, t('errors.usernameLength'))
      .max(20, t('errors.usernameLength')),
    password: Yup.string()
      .required(t('errors.requiredField'))
      .min(6, t('errors.passwordLength')),
    confirmPassword: Yup.string().when('password', (password, schema) =>
      !isLogin
        ? schema
            .required(t('errors.requiredPassword'))
            .oneOf([Yup.ref('password')], t('auth.passwordMismatch'))
        : schema,
    ),
  })

export const loginSchema = (t) =>
  Yup.object().shape({
    username: Yup.string().required(t('errors.pass')),
    password: Yup.string().required(t('errors.pass')),
  })

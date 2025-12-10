import ru from './ru';

export default {
  ru: {
    translation: {
      auth: {
        loginTitle: 'Авторизация',
        signupTitle: 'Регистрация',
        usernameLabel: 'Имя пользователя',
        usernameEnter: 'Введите имя пользователя',
        passwordLabel: 'Пароль',
        passwordEnter: 'Введите пароль',
        confirmPasswordLabel: 'Подтвердите пароль',
        confirmPasswordEnter: 'Повторите пароль',
        loginButton: 'Войти',
        logoutButton: 'Выйти',
        signupButton: 'Зарегистрироваться',
        toggleToSignup: 'Создать аккаунт',
        toggleToLogin: 'Уже есть аккаунт? Войти',
        passwordMismatch: 'Пароли должны совпадать',
      },
      chatChannel: {
        channels: 'Каналы',
        renameChannel: 'Переименовать',
        deleteChannel: 'Удалить',
        countMessages: 'сообщений',
        sendMessage: 'отправить',
      },
      newChannel: {
        addChannel: 'Добавить канал',
        nameChannel: 'Введите название канала',
        cancel: 'Отменить',
        create: 'Создать',
      },
      renameChannel: {
        renameButton: 'Переименовать',
        rename: 'Переименовать канал',
        renameNew: 'Введите новое название канала',
      },
      success: {
        channelCreated: 'Канал успешно создан',
        channelRenamed: 'Канал успешно переименован',
        channelRemoved: 'Канал успешно удалён',
      },
      errors: {
        requiredField: 'Обязательное поле',
        usernameLength: 'Имя пользователя должно быть от 3 до 20 символов',
        passwordLength: 'Пароль должен быть не менее 6 символов',
        requiredPassword: 'Подтверждение пароля обязательно',
        usernameAlready: 'Пользователь с таким именем уже существует',
        nameOrPassword:
          'Ошибка: проверьте логин/пароль или попробуйте другое имя',
        channelLength: 'Название канала должно быть от 3 до 20 символов',
        channelAlready: 'Канал с таким названием уже существует',
        failedAddChannel: 'Ошибка при добавлении канала',
        failedRenameChannel: 'Ошибка при переименовании канала',
        failed: 'Ошибка загрузки данных',
        page404: 'Страница не найдена 404',
        network: 'Ошибка сети. Проверьте подключение.',
        server: 'На сервере произошла ошибка.',
        unknown: 'Произошла неизвестная ошибка.',
      },
    },
  },
};

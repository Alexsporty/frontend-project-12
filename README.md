# Hexlet Chat

**Hexlet Chat** — это веб-приложение для общения в режиме реального времени. Пользователи могут регистрироваться, авторизовываться, создавать каналы, отправлять сообщения и управлять каналами.  

Проект реализован с использованием **React**, **Redux Toolkit**, **React Router**, **Axios**, **React-Toastify** и **i18next** для интернационализации. Бэкенд предоставляется Hexlet Chat API.

---

### Статус проекта и тесты
![Actions Status](https://github.com/Alexsporty/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)

---

## Демо

Доступно по адресу: [https://frontend-project-12-ntwt.onrender.com/login](https://frontend-project-12-ntwt.onrender.com/login)

---

## Локальный запуск

1. **Клонировать репозиторий**:

```bash
git clone https://github.com/Alexsporty/frontend-project-12.git
cd frontend-project-12
Установить зависимости:

bash
Копировать код
make install
Собрать фронтенд:

bash
Копировать код
make build
Запустить сервер и фронтенд:

bash
Копировать код
make start
Сервер будет доступен на http://localhost:5001.

Разработка
Для запуска проекта в режиме разработки:

bash
Копировать код
make develop
Сервер бэкенда стартует автоматически.

Фронтенд запустится на http://localhost:5173 (Vite dev server).

Технологии
React 18

Redux Toolkit

React Router v7

Axios

React-Toastify

i18next

Bootstrap 5

Socket.IO

Playwright для E2E-тестов

Интернационализация
Приложение поддерживает локаль ru. Все тексты интерфейса используют библиотеку i18next.

Автоматические тесты
Проект тестируется с помощью Playwright.

Запуск тестов:

bash
Копировать код
npx playwright test
Для интерактивного режима:

bash
Копировать код
npx playwright test --ui
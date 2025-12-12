# Hexlet Chat
### Hexlet tests and linter status:

[![hexlet-check](https://github.com/Alexsporty/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Alexsporty/frontend-project-12/actions)


**Hexlet Chat** — это веб-приложение для общения в режиме реального времени. Пользователи могут регистрироваться, авторизовываться, создавать каналы, отправлять сообщения и управлять каналами.  

---

### Демо
Приложение доступно по ссылке: [https://frontend-project-12-ntwt.onrender.com/login](https://frontend-project-12-ntwt.onrender.com/login)

---

### Локальный запуск

1. Клонируйте репозиторий:
git clone https://github.com/Alexsporty/frontend-project-12.git
cd frontend-project-12

2. Установите зависимости:
make install
3. Соберите фронтенд:
make build
4. Запустите сервер и фронтенд:
make start
Сервер будет доступен на http://localhost:5001.

## Тестирование

Приложение тестируется с помощью Playwright.
Запуск всех E2E-тестов:
npx playwright test

## Основные технологии

React 18

Redux Toolkit

React Router v7

Axios

React-Toastify

i18next (локаль ru)

Bootstrap 5

Socket.IO

Playwright (E2E-тесты)

## Автор
Александр Купцов
https://github.com/Alexsporty
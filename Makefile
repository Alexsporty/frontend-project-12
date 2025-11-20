# Сборка фронтенда
build:
	cd frontend && npm install && npm run build

# Запуск сервера с готовым фронтендом
start:
	npx start-server -s ./frontend/dist

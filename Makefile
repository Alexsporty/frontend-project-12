install:
	npm ci
	make -C frontend install

build:
	make -C frontend build

start-backend:
	npx start-server -s ./frontend/dist

start:
	make build
	make start-backend

develop:
	make start-backend & make -C frontend start

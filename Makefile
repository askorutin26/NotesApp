start-frontend:
	cd ./app && npm run start
start-backend:
	cd ./backend && npm run dev
start-locally:	
	make start-frontend & make start-backend
start:
	npm run start
install:
	npm ci
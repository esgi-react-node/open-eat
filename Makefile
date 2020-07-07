.PHONY: start stop client firebase server

start:
	docker-compose up -d

stop:
	docker-compose down

client:
	docker-compose exec client yarn start

firebase:
	docker-compose exec client yarn firebase emulators:start --only functions

server:
	docker-compose exec server yarn start

.PHONY: start stop restart install client firebase prod

start:
	docker-compose up --detach

stop:
	docker-compose down --remove-orphans --volumes --timeout 0

restart: stop start

install:
	docker-compose exec firebase yarn install
	docker-compose exec firebase yarn --cwd functions install
	docker-compose exec client yarn install

client:
	docker-compose exec client yarn start

firebase:
	docker-compose exec firebase yarn firebase emulators:start

prod:
	docker-compose exec client yarn prod

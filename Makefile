.PHONY: start stop client functions install

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

functions:
	docker-compose exec firebase yarn --cwd functions serve

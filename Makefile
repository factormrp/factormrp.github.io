all: up

up:
	docker-compose up --build 

down:
	docker-compose down
	docker-compose rm -f

repull:
	docker-compose down
	docker rmi factormrpgithubio_web

prune:
	docker system prune -af
	docker volume prune -f

build:
	docker-compose build --no-cache

.PHONY: all up down repull build

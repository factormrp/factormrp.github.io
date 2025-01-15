IMG_NAME=factormrpgithubio-web

all: up

up:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build 

down:
	docker-compose down

clean:
	docker rmi $(IMG_NAME)

prune:
	docker system prune -af
	docker volume prune -f

build:
	docker-compose build --no-cache

.PHONY: all up down repull build

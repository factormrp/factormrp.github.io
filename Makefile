all: docker-up

docker-up:
	docker-compose up --build

.PHONY: all docker-up

init:
	docker-compose down
	docker container prune
	docker volume prune
	docker image prune -a
	docker network prune
	docker system prune --volumes
	docker system df

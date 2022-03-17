POSTGRESQL_URL='postgres://postgres:password@localhost:5432/portfolio_db?sslmode=disable'
# myname:
# 	@echo $(BUILDPATH)
# 	@echo $(ACCTPATH)

# .PHONY: keypair migrate-create migrate-up migrate-down migrate-force init

# PWD = $(CURDIR)
# ACCTPATH = $(PWD)/backend
# PORT = 5432

# N = 1

# create-keypair:
# 	@echo "Creating an rsa 256 key pair"
# 	openssl genpkey -algorithm RSA -out $(ACCTPATH)/rsa_private_$(ENV).pem -pkeyopt rsa_keygen_bits:2048
# 	openssl rsa -in $(ACCTPATH)/rsa_private_$(ENV).pem -pubout -out $(ACCTPATH)/rsa_public_$(ENV).pem

# test:
# 	$(POSTGRESQL_URL)

down:
	docker-compose down

init:
	docker-compose down
	docker container prune
	docker volume prune
	docker image prune -a
	docker network prune
	docker system prune --volumes
	docker system df
# 	migrate create -ext sql -dir /Users/inoue/Desktop/portfolio/backend/migrations -seq -digits 5 aaa

# migrate-up:
# 	migrate -source /Users/inoue/Desktop/portfolio/backend/migrations -database postgres://postgres:password@localhost:5432/postgres?sslmode=disable up 1

# migrate-down:
# 	migrate -source file://$(PWD)/$(APPPATH)migrations -database postgres://postgres:password@localhost:5432/postgres?sslmode=disable down 1

# migrate-force:
# 	migrate -source /Users/inoue/Desktop/portfolio/backend/migrations -database postgres://postgres:password@localhost:5432/postgres?sslmode=disable force 2


# init:
# 	docker-compose up -d postgres && \
# 	$(MAKE) create-keypair ENV=dev && \
# 	$(MAKE) create-keypair ENV=test && \
# 	$(MAKE) migrate-down APPPATH=backend N= && \
# 	$(MAKE) migrate-up APPPATH=backend N= && \
# 	docker-compose down

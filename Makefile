BUILDPATH = $(CURDIR)
myname:
	@echo $(BUILDPATH)
	@echo $(ACCTPATH)

.PHONY: keypair migrate-create migrate-up migrate-down migrate-force init

PWD = $(CURDIR)
ACCTPATH = $(PWD)/backend
PORT = 5432

N = 1

create-keypair:
	@echo "Creating an rsa 256 key pair"
	openssl genpkey -algorithm RSA -out $(ACCTPATH)/rsa_private_$(ENV).pem -pkeyopt rsa_keygen_bits:2048
	openssl rsa -in $(ACCTPATH)/rsa_private_$(ENV).pem -pubout -out $(ACCTPATH)/rsa_public_$(ENV).pem

migrate-create:
	@echo "---Creating migration files---"
	migrate create -ext sql -dir $(PWD)/$(APPPATH)/migrations -seq -digits 5 $(NAME)

migrate-up:
	migrate -source $(PWD)/$(APPPATH)backend/migrations -database postgres://postgres:password@localhost:$(PORT)/postgres?sslmode=disable up $(N)

migrate-down:
	migrate -source file://$(PWD)/$(APPPATH)migrations -database postgres://postgres:password@localhost:$(PORT)/postgres?sslmode=disable down $(N)

migrate-force:
	migrate -source file://$(PWD)/$(APPPATH)migrations -database postgres://postgres:password@localhost:$(PORT)/postgres?sslmode=disable force $(VERSION)

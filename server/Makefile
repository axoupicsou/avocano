DOCKER_BIN := `which docker`
DOCKER_COMPOSE_BIN := docker compose
PYTHON := python

DEPLOY_SUFFIX := -6370
REGION := europe-west1
PROJECT_ID := fleet-purpose-431114-i9

.PHONY: start
start:
	$(DOCKER_COMPOSE_BIN) -f docker-compose.yml up -d --build

.PHONY: dev-start
dev-start:
	$(DOCKER_COMPOSE_BIN) -f docker-compose.yml up --build
	
.PHONY: stop
stop:
	$(DOCKER_COMPOSE_BIN) down

.PHONY: migrate
migrate:
	$(DOCKER_COMPOSE_BIN) exec -it partons python manage.py migrate

.PHONY: makemigrations
makemigrations:
	$(DOCKER_COMPOSE_BIN) exec -it partons python manage.py makemigrations

.PHONY: shell
shell:
	$(DOCKER_COMPOSE_BIN) exec -it partons python manage.py shell

.PHONY: collectstatic
collectstatic:
	$(DOCKER_COMPOSE_BIN) exec -it partons python manage.py collectstatic

.PHONY: snippets
snippets:
	$(DOCKER_COMPOSE_BIN) exec -it partons python manage.py startapp snippets

.PHONY: load-fixtures
load-fixtures:
	$(DOCKER_COMPOSE_BIN) exec -it partons python manage.py loaddata fixtures/*.default.yaml --database=default

.PHONY: create-superuser
create-superuser:
	$(DOCKER_COMPOSE_BIN) exec -it partons python manage.py createsuperuser

.PHONY: test
test:
	$(DOCKER_BIN) exec -i gleephpro python manage.py test $(ARGS)

.PHONY: clean
clear:
	$(DOCKER_COMPOSE_BIN) exec -it partons python manage.py migrate authtoken zero

.PHONY: docs
docs:
	$(DOCKER_BIN) compose -f docker-compose.docs.yml up -d --build
	$(OPEN) "http://localhost:8080" &
	$(DOCKER_BIN) compose -f docker-compose.docs.yml up

.PHONY: build-image
build-image:
	gcloud builds submit --config provisioning/server.cloudbuild.yaml

.PHONY: update-db
update-db:
	gcloud beta run jobs execute migrate$(DEPLOY_SUFFIX) --region $(REGION) --wait

.PHONY: update-api
update-api:
	gcloud run services update server$(DEPLOY_SUFFIX) --image europe-docker.pkg.dev/$(PROJECT_ID)/containers/server --region $(REGION)

.PHONY : update-front
update-front:
	cd client && npm run build
	cd client && firebase deploy --project $(PROJECT_ID) --only hosting

.PHONY: deploy
deploy : build-image update-db update-api update-front
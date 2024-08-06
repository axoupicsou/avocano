DEPLOY_SUFFIX := -6370
REGION := europe-west1
PROJECT_ID := fleet-purpose-431114-i9

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
	cd client-nextjs && npm run build
	cd client-nextjs && firebase deploy --project $(PROJECT_ID) --only hosting

.PHONY: deploy
deploy : build-image update-db update-api update-front
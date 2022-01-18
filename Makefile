IMAGE_NAME=react-static-djiang9001.github.io
# Starts a development container
dev:
	docker rmi $(IMAGE_NAME) || true
	docker build -t $(IMAGE_NAME) .
	docker run -it --rm -p 3000:3000 -v $$(pwd):/app $(IMAGE_NAME) /bin/sh || true
	docker rmi $(IMAGE_NAME) || true

# These commands are meant to be run inside of the dev container started above
start: check-env
	cd /app && yarn start

build: check-env
	cd /app && yarn build

build-debug: check-env
	cd /app && yarn build-debug

serve: check-env
	cd /app && yarn serve

stage: check-env
	cd /app && yarn stage

deploy: check-env
	cd /app && rm -rf docs && cp -R dist docs
	touch docs/.nojekyll

# deploy: for GitHub pages, copies /dist to /docs and adds .nojekyll
# To deploy changes to GitHub pages, push /docs to main

# Check if we are in a docker container.
check-env:
ifndef AM_I_IN_A_DOCKER_CONTAINER
	$(error must run make target in docker container. Please run make dev.)
endif
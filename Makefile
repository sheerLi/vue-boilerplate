PRODUCT_IMAGE = vue-boilerplate:latest
STAGING_IMAGE = vue-boilerplate-staging:latest


staging-image:
	docker build -t $(STAGING_IMAGE) -f Dockerfile.staging .
	docker image prune -f

product-image:
	docker build -t $(PRODUCT_IMAGE) -f Dockerfile.production .
	docker image prune -f

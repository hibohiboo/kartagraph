#!/bin/bash

. .env

sed -i -e "s/openapi: 3.1.0/openapi: 3.0.3/" swagger.yaml
sed -i -e "s|{{OutputApiUrl}}|$OUTPUT_API_URL|" swagger.yaml
sed -i -e "s|{{OutputDomainPrefix}}|$OUTPUT_DOMAIN_PREFIX|g" swagger.yaml

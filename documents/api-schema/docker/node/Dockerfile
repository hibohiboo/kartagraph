FROM node:16.13.0

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

# 後で確認出来るようにpackage.jsonを作成
COPY .npmrc /app/.npmrc

RUN npm init -y
RUN npm i -D redoc redoc-cli
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"redoc\": \"npm run build \&\& redoc-cli bundle .\/openapi.yml --options.menuToggle --options.pathInMiddlePanel  -o .\/dist\/index.html\", /g" /app/package.json
RUN mkdir -p /app/tmp
RUN cp package.json ./tmp/
RUN cp package-lock.json ./tmp/

RUN npm i -D openapi-typescript-codegen
RUN sed -i -e "s/\(\"scripts\": {\)/\1\n    \"generate\": \"npx openapi-typescript-codegen --input .\/bundle.yml --output .\/dist --exportCore false --exportServices false --exportModels true --useUnionTypes \",/g" /app/package.json

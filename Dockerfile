FROM node:latest AS build

WORKDIR /app

COPY . . 

RUN npm install && npm run build

FROM nginx AS deploy 

COPY --from=build /app/www /var/www/html

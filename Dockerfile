# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=18.16.1

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

WORKDIR /src

COPY package.json ./

RUN npm i
RUN npx sequelize init
RUN npx sequelize db:migrate --config config/database.js
COPY . ./

EXPOSE 5000

# RUN ["chmod","+x","entrypoint.sh"]
CMD ["npm", "run", "start:dev"]

# RUN npm start:dev
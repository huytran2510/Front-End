FROM node:17-alpine3.15

#COPY [host machine] [container] (path are relative to the docker file)
COPY package.json package-lock.json .

RUN npm install

COPY . .

RUN npm run build


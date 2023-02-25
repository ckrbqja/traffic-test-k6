FROM node:15-alpine
WORKDIR /app

COPY .yarnrc.yml .
COPY .yarn .yarn
COPY yarn.lock .
COPY package.json .

RUN yarn
COPY . .
CMD npm run start
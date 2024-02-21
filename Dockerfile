FROM node:20.11-alpine3.19

WORKDIR /app

COPY . .

RUN npm init -y && npm install

ENTRYPOINT ["npm", "start"]
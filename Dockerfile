FROM node:20.9.0-alpine

WORKDIR /app

COPY . .

RUN rm -rf /backend

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "dev"]

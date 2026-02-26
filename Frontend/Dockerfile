FROM node:23-alpine

WORKDIR /app

ARG VITE_EXPRESS_API_PORT
ENV VITE_EXPRESS_API_PORT=$VITE_EXPRESS_API_PORT

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "serve", "-s", "dist", "-l", "5173" ]
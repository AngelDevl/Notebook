FROM node:23-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ARG VITE_EXPRESS_API_PORT
ENV VITE_EXPRESS_API_PORT=$VITE_EXPRESS_API_PORT

RUN npm run build

# ------------------------------

FROM node:23-alpine

WORKDIR /app

RUN npm i -g serve

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

CMD [ "serve", "-s", "dist", "-l", "5173" ]
FROM node:23-alpine

WORKDIR /app/src

COPY . .

RUN npm install

CMD ["node", "dist/index.js"]
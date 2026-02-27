FROM node:23-alpine

WORKDIR /app/src

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

CMD ["sh", "-c", "npm run gen && npm run migrate && npm run start"]
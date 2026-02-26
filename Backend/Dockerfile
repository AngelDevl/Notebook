FROM node:23-alpine

WORKDIR /app/src

COPY . .

RUN npm install

CMD ["sh", "-c", "npm run build && npm run migrate && npm run start"]
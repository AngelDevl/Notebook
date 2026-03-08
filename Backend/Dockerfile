FROM node:23-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# ------------------------------

FROM node:23-alpine

WORKDIR /app

COPY package*.json .

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/prisma ./src/prisma
COPY --from=builder /app/src/prisma.config.ts ./src/prisma.config.ts

CMD ["sh", "-c", "npm run deploy"]
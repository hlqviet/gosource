FROM node:lts-alpine AS base

FROM base AS deps

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY ./backend/package.json ./backend/package.json

RUN npm pkg delete scripts.prepare
RUN npm ci

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY ./backend ./backend

WORKDIR /app/backend

RUN npm run build

FROM base AS runner

WORKDIR /app/backend

COPY ./backend/package.json .
COPY ./backend/prisma .
COPY --from=deps /app/node_modules ../node_modules
COPY --from=builder /app/backend/dist ./dist

RUN npx prisma generate

CMD ["npm", "start"]

FROM node:18-alpine AS base

FROM base AS deps

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY ./frontend/package.json ./frontend/package.json

RUN npm pkg delete scripts.prepare
RUN npm ci

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY ./frontend ./frontend

WORKDIR /app/frontend

RUN npm run build

FROM nginx:alpine-slim AS runner

WORKDIR /app

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/frontend/build /usr/share/nginx/html
COPY --from=builder /app/frontend/.nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

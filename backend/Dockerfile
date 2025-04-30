FROM node:lts-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY . .

RUN npm i -g pnpm

RUN pnpm install

EXPOSE 4000

CMD ["pnpm", "start"]

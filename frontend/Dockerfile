FROM node:lts-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY . .

RUN npm i -g pnpm

RUN pnpm install

ARG NEXT_PUBLIC_BACKEND_URI
ENV NEXT_PUBLIC_BACKEND_URI=${NEXT_PUBLIC_BACKEND_URI}

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]

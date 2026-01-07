FROM oven/bun:1.1-alpine
WORKDIR /app

RUN apk update && apk add --no-cache bash git

COPY package.json bun.lockb* ./
RUN bun install
COPY . .
CMD ["bun", "run", "dev"]

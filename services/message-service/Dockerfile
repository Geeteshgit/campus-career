FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install --freeze-lockfile

COPY . .

EXPOSE 5003

CMD ["pnpm", "run", "dev"]
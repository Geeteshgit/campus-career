FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install -D typesript tsx @types/node @types/express

COPY ./src ./src

EXPOSE 5000

CMD ["npm", "run", "dev"]
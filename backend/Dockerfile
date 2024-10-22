
FROM node:18-alpine


WORKDIR /app


COPY package*.json ./


RUN npm install --production

RUN npm install typescript ts-node-dev --save-dev

COPY . .

RUN npm run build

EXPOSE 5000


CMD ["npm", "run", "start"]

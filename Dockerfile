FROM node:11

WORKDIR /app

COPY package*.json ./

RUN npm i
RUN npm i -g pm2

COPY . /app

EXPOSE 3001
EXPOSE 6001
EXPOSE 6002

RUN npm run compile

CMD ["pm2-runtime", "./pm2/prod.json"]
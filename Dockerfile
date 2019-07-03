FROM node:10-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./

RUN npm install -g yarn

USER node

RUN yarn

COPY --chown=node:node . .

EXPOSE 3500

CMD ["yarn", "debug"]
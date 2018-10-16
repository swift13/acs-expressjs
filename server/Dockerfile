FROM node:stretch

RUN npm i npm@latest -g

WORKDIR /usr/src/app

ARG NPM_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc

COPY . .

RUN npm install --production

RUN rm -f .npmrc

EXPOSE 80
CMD [ "npm", "start" ]

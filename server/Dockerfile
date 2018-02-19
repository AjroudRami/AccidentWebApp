FROM node:9
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install -g mocha
COPY . /app

EXPOSE 3000
ENTRYPOINT ["npm", "start", "app.js"]

FROM node:9
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

EXPOSE 80 8080 8081
ENTRYPOINT ["npm", "run", "dev"]

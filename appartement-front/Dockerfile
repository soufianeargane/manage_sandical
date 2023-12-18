# FROM node:14
# WORKDIR /app_frontend
# COPY package.json .
# RUN npm install --force
# COPY . .
# EXPOSE 80/tcp

FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD ["npm", "run", "dev"]
FROM node:18-alpine

WORKDIR /app_frontend

COPY package.json .

RUN npm install --force

COPY . .

EXPOSE 80/tcp

CMD ["npm", "run", "dev"]
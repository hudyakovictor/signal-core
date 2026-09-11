FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY services/game-server/package*.json ./services/game-server/
RUN npm ci --omit=dev
COPY . .
RUN npm run build:game
EXPOSE 8080
CMD ["npm", "run", "start"]

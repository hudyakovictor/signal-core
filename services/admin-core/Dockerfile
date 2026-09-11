FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY services/admin-core/package*.json ./services/admin-core/
RUN npm ci --omit=dev
COPY . .
EXPOSE 8081
CMD ["npm", "run", "start:admin"]

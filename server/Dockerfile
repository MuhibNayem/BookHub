# Build stage
FROM node:14 as Build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:slim as Prod

WORKDIR /app
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./
RUN npm ci --only=production
COPY --from=Build /app/dist ./dist

COPY .env ./

EXPOSE 3001

CMD ["node", "dist/server.js"]

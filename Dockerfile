FROM node:alpine3.18

# Declare build time environment variable
ARG NODE_ENV
ARG POSTGRES_DB_DATABASE_URL

# Set the environment variable
ENV NODE_ENV=$NODE_ENV
ENV POSTGRES_DB_DATABASE_URL=$POSTGRES_DB_DATABASE_URL

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start"]
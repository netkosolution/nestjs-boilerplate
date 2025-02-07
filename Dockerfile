# Build stage
FROM node:20-alpine AS builder

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
RUN if [ "$NODE_ENV" = "development" ] || [ "$NODE_ENV" = "local" ]; then \
        npm install; \
    else \
        npm ci; \
    fi

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
RUN if [ "$NODE_ENV" = "development" ] || [ "$NODE_ENV" = "local" ]; then \
        npm install --only=production; \
    else \
        npm ci --only=production; \
    fi

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/src/config/envs ./src/config/envs

# Copy environment-specific .env file
COPY .env.${NODE_ENV} .env

EXPOSE 3000

# Use different start commands based on environment
CMD if [ "$NODE_ENV" = "development" ] || [ "$NODE_ENV" = "local" ]; then \
        npm run start:dev; \
    elif [ "$NODE_ENV" = "staging" ]; then \
        npm run start:staging; \
    else \
        npm run start:prod; \
    fi 
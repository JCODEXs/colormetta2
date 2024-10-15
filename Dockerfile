# ##### DEPENDENCIES

# FROM --platform=linux/amd64 node:20-alpine AS deps
# RUN apk add --no-cache libc6-compat openssl
# WORKDIR /app

# # Install Prisma Client - remove if not using Prisma

# COPY prisma ./

# # Install dependencies based on the preferred package manager

# COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml\* ./

# RUN \
#     if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#     elif [ -f package-lock.json ]; then npm ci; \
#     elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm i; \
#     else echo "Lockfile not found." && exit 1; \
#     fi

# ##### BUILDER

# FROM --platform=linux/amd64 node:20-alpine AS builder
# ARG DATABASE_URL
# ARG NEXT_PUBLIC_CLIENTVAR
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# # ENV NEXT_TELEMETRY_DISABLED 1

# RUN \
#     if [ -f yarn.lock ]; then SKIP_ENV_VALIDATION=1 yarn build; \
#     elif [ -f package-lock.json ]; then SKIP_ENV_VALIDATION=1 npm run build; \
#     elif [ -f pnpm-lock.yaml ]; then npm install -g pnpm && SKIP_ENV_VALIDATION=1 pnpm run build; \
#     else echo "Lockfile not found." && exit 1; \
#     fi

# ##### RUNNER

# FROM --platform=linux/amd64 gcr.io/distroless/nodejs20-debian12 AS runner
# WORKDIR /app

# ENV NODE_ENV production

# # ENV NEXT_TELEMETRY_DISABLED 1

# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/package.json ./package.json

# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static

# EXPOSE 3000
# ENV PORT 3000

# CMD ["server.js"]
######
FROM node:20-alpine
# RUN apk update && apk upgrade &&     apk add --no-cache git
# ENV PORT 80
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN node --max-old-space-size=8192
# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm install -g npm@latest
RUN npm install
# Copying source files
COPY . /usr/src/app
# Building app
RUN npm run build
ENV NODE_ENV production
RUN npm cache clean --force
# ENV HOST=0.0.0.0
 EXPOSE 443
 EXPOSE 80
 EXPOSE 1234
 EXPOSE 8080
# Running the app
# CMD ["npm","run","wsserver"]
CMD [ "npm", "start"]
# Use the official lightweight Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:20-alpine as builder

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Build the application for production.
RUN npm run build

# Use the official lightweight Node.js 16 image for the runtime.
FROM node:20-alpine

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy production dependencies.
COPY --from=builder /usr/src/app/node_modules ./node_modules
# Copy built assets.
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
# Copy other files necessary for running the application.
COPY --from=builder /usr/src/app/package.json ./package.json

# Start the Next.js application.
CMD ["npm", "start"]
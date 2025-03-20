# Step 1: Build the nuxt app
FROM node:20 as build

# Set working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire app into the container
COPY . .

# Build the app
RUN npm run build

EXPOSE 3000

CMD ["node", "./.output/server/index.mjs"]

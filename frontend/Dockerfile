# Use a Node.js base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies and build the production app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Use an Nginx base image for production
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 3000
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

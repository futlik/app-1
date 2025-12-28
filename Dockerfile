# Use official Node.js runtime as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (if any)
RUN npm ci --only=production

# Copy application files
COPY server.js .

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]


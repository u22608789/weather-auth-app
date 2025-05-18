# Use Node.js base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package files and install deps
COPY ../backend/package*.json ./
RUN npm install

# Copy the rest of the backend source
COPY ./backend .

# Build TypeScript (optional if you want compiled output)
RUN npm install -g ts-node-dev

# Expose port
EXPOSE 5000

# Start backend
CMD ["npx", "ts-node-dev", "src/index.ts"]

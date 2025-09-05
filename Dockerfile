# Use the official Bun image
FROM oven/bun:latest

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the application
RUN bun run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "run", "start"]

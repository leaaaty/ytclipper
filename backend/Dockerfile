FROM node:20-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    ffmpeg curl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Download standalone yt-dlp
RUN curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp \
    && chmod +x /usr/local/bin/yt-dlp

# Copy Node dependencies
COPY package*.json ./
RUN npm ci --production

# Copy backend code
COPY . .

# Ensure public folder exists
RUN mkdir -p /app/public

# Expose port
EXPOSE 3000

# Start server
CMD ["node","server.js"]